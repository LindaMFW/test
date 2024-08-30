# mfc_department_partner_master_e2e_testing

To run on local:

    npm run api_test --env=stg

To run with docker

    docker build -f ./Dockerfile -t playwrighttest .

    docker run --network host --rm -v $(pwd):/home/app/ --entrypoint npm playwrighttest run api_test --env=stg
