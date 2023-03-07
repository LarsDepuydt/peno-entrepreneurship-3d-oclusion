var submitOK = false;
function afterSubmit(event){
    event.preventDefault();
    submitOK = true;
}

document.getElementById("redirect-button").addEventListener("click", function() {
    if (submitOK) {
        var client = new threedoclusionv1.ScanService('localhost:50051', grpc.credentials.createInsecure());

        client.SendVR({client_id: 112, scan_id: 222}, function(err, response) {
            console.log('Message:', response.message);
        });
    }
});

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../../../backend/sw.js');
}
