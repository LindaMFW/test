import { FullConfig, Reporter, Suite } from '@playwright/test/reporter'
import * as fs from 'fs'
import * as path from 'path'

class SlackReporter implements Reporter {
  private suiteList: Suite[] = []
  private readonly outputFile: string

  constructor(options: { outputFile: string }) {
    this.outputFile = options.outputFile
  }

  onBegin(config: FullConfig, suite: Suite) {
    this.suiteList.push(suite)
  }

  onEnd() {
    let totalPassed = 0
    let totalFailed = 0
    let totalFlaky = 0
    let totalSkipped = 0
    let totalTimedOut = 0
    let totalInterrupted = 0

    this.suiteList.forEach((suite) => {
      suite.allTests().forEach((test) => {
        let isPassed = false
        let isFailed = false
        let isFlaky = false
        test.results.forEach((result) => {
          result.status === 'skipped' && totalSkipped++
          result.status === 'timedOut' && totalTimedOut++
          result.status === 'interrupted' && totalInterrupted++

          if (result.retry === 0) {
            isPassed = result.status === 'passed'
            isFailed = result.status === 'failed'
          } else {
            if ((result.status === 'passed' && isFailed) || (result.status === 'passed' && isPassed)) {
              isFlaky = true
              isPassed = false
              isFailed = false
            }
          }
        })

        isPassed && totalPassed++
        isFailed && totalFailed++
        isFlaky && totalFlaky++
      })

      fs.writeFileSync(
        path.join(__dirname, '../', this.outputFile),
        JSON.stringify({
          totalPassed,
          totalFailed,
          totalFlaky,
          totalSkipped,
          totalTimedOut,
          totalInterrupted,
        })
      )
    })
  }
}

export default SlackReporter
