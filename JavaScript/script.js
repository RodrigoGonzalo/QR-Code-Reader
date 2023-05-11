const Wrapper = document.querySelector(".wrapper"),
Form = Wrapper.querySelector("form"),
FileInput = Form.querySelector("input"),
TextInfo = Form.querySelector("p"),
CopyButton = Wrapper.querySelector(".copy"),
CloseButton = Wrapper.querySelector(".close");

Form.addEventListener("click", () => FileInput.click());
CloseButton.addEventListener("click", () => Wrapper.classList.remove("active"));

CopyButton.addEventListener("click", () => {
    let Text = Wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(Text);
})

FileInput.addEventListener("change", e => {
    let file = e.target.files[0]; // User selected file.
    if(!file) return;
    let formData = new FormData(); // Creating a Form Data object.
    formData.append("file", file);
    fetchRequest(formData, file);
});

function fetchRequest(formData, file){
    TextInfo.innerText = "Scanning QR Code..."
    /*
        Sending the post request to the QR Server API with passing form data as body 
        and getting a response form the server.
    */
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        if(!result) return;
        Wrapper.querySelector("textarea").innerText = result;
        Form.querySelector("img").src = URL.createObjectURL(file);
        TextInfo.innerText = result ? "Upload QR Code to Scan" : "Couldn't Scan QR Code";
        Wrapper.classList.add("active");
    }).catch(() =>{
        TextInfo.innerText = "Couldn't Scan QR Code";
    })
}

