function afterSubmit(event) {
    event.preventDefault(); // prevent the form from reloading the page
    /*
    Other approach: use on action in the form to make a request to the server
    Server will redirect from this page to a page that confirms whether the code was accepted
    -> will later redirect from that page to the one you want: eg /VR/blabla
    So one page in between
    Can also use a push notification of some kind
    */
    var code = document.getElementById("code").value;
    var submitOK = true;
  
    if (code.length > 10) {
      alert("The code may have no more than 10 characters");
      submitOK = false;
    }

    // Additional criteria
  
    if (submitOK) { // Trigger waiting procedure
      waitForResponse();
    }
}

function waitForResponse() {
    var client = new threedoclusionv1.ScanService('localhost:50051', grpc.credentials.createInsecure());

    client.Waiting({}, function(err, response) {
        console.log('Message:', response.message);
        // Err
    });

    /**for await (const res of client.introduce({ name: "Joseph" })) {
        console.log(res);
        // For server side streaming
    } */
}

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../../../backend/sw.js');
}
