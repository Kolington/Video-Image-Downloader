const fileInput = document.querySelector("input");
const downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", e => {
    e.preventDefault(); //Preventing form from submitting
    downloadBtn.innerText = "Downloading File...";
    fetchFile(fileInput.value);
});

function fetchFile(url) {
    //Fetching file & returning response as blob
    // blob() method of response interface takes a response stream and reads it to completion. it returns a promise that resolves with a Blob.
    fetch(url).then(res => res.blob()).then(file => {
        //URL.createObjectURL creates a url of passed object
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl; // Passing tempUrl as href of <a> tag
        //Passing file last name & extension as download value of <a> tag
        aTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag); //Adding <a> tag inside body
        aTag.click(); //Clicking <a> tag so the file download
        aTag.remove(); //Removing <a> tag once file download
        URL.revokeObjectURL(tempUrl);
        downloadBtn.innerText = "Download File...";
    }).catch(() => {
        //Catch method will call if any error comes during downloading
        downloadBtn.innerText = "Download File...";
        alert("Failed to Download File!");
    });
}