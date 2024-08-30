#!/bin/bash
# Our custom function
cust_func(){
  echo "Do something $1 times..."
  curl --location --request PUT 'https://project-cost.mfvn.dev/api/v1/calculation-lock' \
--header 'authority: project-cost.mfvn.dev' \
--header 'accept: application/json, text/plain, */*' \
--header 'accept-language: ja-JP,ja-JP;q=0.9,en-US;q=0.8' \
--header 'access-control-allow-origin: *' \
--header 'content-type: application/json' \
--header 'cookie: pjc_jwt_access=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMUhDQ1dNWENFRjJNTUo5Nkg2R1RTVlhBUyIsInVzZXJfaWQiOiIwMUhBUk5CRkdOWk1DM1Q0OVRTQzAzMUNIMiIsIm9mZmljZV9pZCI6IjAxSEI1M0FQRlBSMjk0NVdBMU1IVEM2UkhRIiwiZXhwIjoxNjk3MDMzMzE4LCJpYXQiOjE2OTY5OTAxMTh9.EGTy-MJzCKdtNEmSHQiCO8FK9V1BWywDxwCOTrFQ4f0; _ga=GA1.1.1859177982.1693303467; _ga_4ZJF4Y405D=deleted; _ga_4ZJF4Y405D=GS1.1.1696575782.70.0.1696575782.0.0.0; NEXT_LOCALE=jp; logged_in=true; accept_term=true; has_available_tenant=true; has_available_office=true; has_active_office=true; agent_login=false; office_user_id=01HB53APH8VM5TFQ73H6G6DNJG; permissions=eyIxIjpbIkNSVUQiXSwiMiI6WyJDUlVEIl0sIjMiOlsiQ1JVRCJdLCI0IjpbIkNSVUQiXSwiOCI6WyJDUlVEIl0sIjkiOlsiQ1JVRCJdLCIxMCI6WyJDUlVEIl0sIjExIjpbIkNSVUQiXSwiMTIiOlsiQ1JVRCJdLCIxMyI6WyJDUlVEIl0sIjE0IjpbIkNSVUQiXSwiMTUiOlsiQ1JVRCJdLCIxNiI6WyJDUlVEIl0sIjE3IjpbIkNSVUQiXSwiMTgiOlsiQ1JVRCJdLCIxOSI6WyJDUlVEIl19' \
--header 'x-csrf-token: 08f72f44f8e855b9d4c26856bdc8638cad53f56c4dd2ab2673d78289a720207b' \
--data '{
    "confirmation_lock":true,
    "man_hour_lock": false,
    "term_month": "2023-06"
}'
}
# For loop 5 times
for i in {1..5}
do
	cust_func $i & # Put a function in the background
done
 
## Put all cust_func in the background and bash 
## would wait until those are completed 
## before displaying all done message
wait 
echo "All done"