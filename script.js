const ip = '192.168.43.4';
const port = 3002;

const URL = `http://${ip}:${port}`;
const uploadURL = `${URL}/upload`;
const downloadURL = `${URL}/download`;


// cross sign(on uploaded success dialog), close on click
const successCrossSign = document.getElementById('successCrossSign');
const failedCrossSign = document.getElementById('failedCrossSign');
const successDialog = document.querySelector('.uploadSuccessDialog');

successCrossSign.addEventListener('click', (e) => {
    successDialog.style.display = 'none'; // TODO: make visible on upload success
});

const showSuccessMessageOnPage = () => {
    successDialog.style.display = 'block';
}

const failedDialog = document.querySelector('.uploadFailedDialog');
failedCrossSign.addEventListener('click', (e) => {
    failedDialog.style.display = 'none'; // TODO: make visible on upload failed
});

const showFailedMessageOnPage = () => {
    failedDialog.style.display = 'block';
}


const uploadingDialog = document.querySelector('.uploadingDialog');

const showUploadingDialog = () => {
    uploadingDialog.style.display = 'block';
}

const hideUploadingDialog = () => {
    uploadingDialog.style.display = 'none';
}





//upload button
const uploadBtn = document.getElementById('uploadBtn');


// on clicking upload button, submit data
uploadBtn.addEventListener('click', (e) => {
    //on btn click, enable uploading dialog
    showUploadingDialog();

    //description field
    const descriptionBox = document.querySelector('.description');
    const files = document.querySelector('.file').files;

    const resetInputFields = () => {
        descriptionBox.value = null;
        files = null;
    }

    let formData = new FormData();

    console.log(files[0], descriptionBox.value);
    const file = files[0];
    formData.append('description', descriptionBox.value);
    formData.append('file', file);

    // sending data to server through api if file is selected
    if (file != null) fetch(uploadURL, {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            response.json();
        })
        .then(data => {
            console.log(data);
            // sending response to html page (file upload success)
            hideUploadingDialog();
            showSuccessMessageOnPage();
            // resetInputFields();
        })
        .catch(error => {
            console.error(error);

            // sending response to html page (file upload failed)
            hideUploadingDialog();
            showFailedMessageOnPage();
            // resetInputFields();
        });
});

