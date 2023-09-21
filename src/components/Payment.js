// /*
// import axios from 'axios'

// const Payment = (props) => {
//     console.log('Payment props', props)
//     console.log('props.match', props.match)

//     const {orderId} = props.match.params


//     // hardcoding to test
//     const paymentRespObj = {
//         "_id": "64f80416f08f76cbe2e72bd8",
//         "orderId": "order_MYvH8xiENV3ob1",
//         "userLearnerId": {
//             "_id": "64f7fca5440ba857b7c3ecbd",
//             "username": "learner sona",
//             "email": "sonashreesona3@gmail.com",
//             "password": "$2a$10$DRDtXYq8mV9odPu37bAZG.ozIFgNKFQljSF9o6hlXqsUPHloeLT.C",
//             "role": "learner",
//             "createdAt": "2023-09-06T04:14:30.022Z",
//             "updatedAt": "2023-09-06T04:14:30.022Z",
//             "__v": 0
//         },
//         "courseId": {
//             "_id": "64f74cfadd97ed5fe27d4e3a",
//             "name": "development course1 sona",
//             "description": "in this course you will learn about development",
//             "duration": "6 months",
//             "category": "development",
//             "price": 10000,
//             "userInstructorId": "64f74245d7616f969dc8f27e",
//             "isPublished": false,
//             "isDeleted": false,
//             "learners": [],
//             "ratingsAndReviews": [],
//             "__v": 0
//         },
//         "status": "pending",
//         "paymentDate": "Wed Sep 06 2023 09:59:50 GMT+0530 (India Standard Time)",
//         "__v": 0
//     }


//     // <script src="https://checkout.razorpay.com/v1/checkout.js"></script> add this file in index.html under public folder
//     const optionsObj = {
//         key: 'rzp_test_IgvzGLeinjQAX2', // key is RAZORPAY_KEY_ID in .env file
//         amount: paymentRespObj.courseId.price, // we'll get this from /api/create-order response
//         currency: "INR", // we'll get this from /api/create-order response
//         // name: book.name,
//         description: `Buy Course ${paymentRespObj.courseId.name}`,
//         order_id: orderId, // we'll get this from /api/create-order response
//         prefill: {
//             name: paymentRespObj.userLearnerId.username,
//             email: paymentRespObj.userLearnerId.email
//         },


//         handler: async (handlerResponse) => { // this function is called only after successful payment
//             console.log('inside handler')
//             console.log('handler response', handlerResponse) // response has order_id, payment_id & signature
//             /*
//                 handler response o/p: {
//                     razorpay_order_id: "order_MXWo0aktCptiim"
//                     razorpay_payment_id: "pay_MXWoYif6rHnm2e"
//                     razorpay_signature: "8e4e9da165d04d0c6d8d6c96dc269f5bd65e287637f3526b3cd95ecee3ff1f57"
//                 }
//             */
//             // alert('payment succeeded')

//             /*
//             try{
//                 const resultResp = await axios.post('http://localhost:3050/api/payments/verify-order', handlerResponse)
//                 console.log('resultResp', resultResp)
//             }
//             catch(e){
//                 console.log(e)
//             }
//             *//*
//         }
//     }

    
//     const rzp1 = new window.Razorpay(optionsObj) // create new razorpay instance
//     console.log('rzp1', rzp1)

//     rzp1.on('payment.failed', function(resp){
//         alert('payment failed')
//     })

//     rzp1.open() // open checkout page => opens pop-up(modal) of razorpay

//     return (
//         <div>
    
//         </div>
//     )
// }

// export default Payment
// */