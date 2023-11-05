const https = require('https');


const sendOTP = async (req, res) => {
    try {
        function generateRandomNumbers() {
            var min = 1; // Minimum value
            var max = 9; // Maximum value
            var count = 5; // Number of random numbers to generate
            var numbers = [];
        
            for (var i = 0; i < count; i++) {
              var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
              numbers.push(randomNumber);
            }
        
            return numbers;
          }
        
          // Example usage
          let otp = ""
          var randomNumbers = generateRandomNumbers();
          randomNumbers.forEach((e) => {
            otp += e.toString()
          })


          https.get(`https://api.wolftechs.pk/sendsms.php?apikey=d7b06388d746b26e571a440b49aa1c32&phone=${req.body.phoneNum}&sender=SMS+Alert&message=This+message+is+from+zivaj.com+We+need+to+know+is+that+you+Please+enter+${otp}`, (response) => {
            let data = '';
          
            response.on('data', (chunk) => {
              data += chunk;
            });
          
            response.on('end', () => {
              console.log(data); // This will log the response from the URL
              res.json({status:data,data:otp});
            });
          }).on('error', (error) => {
            console.error(`Error: ${error}`);
          });
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}







module.exports = {
  sendOTP,
   
}