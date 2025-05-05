// download files
export const downloadFile = (url, fileName) => {
    // Checking if uploadFileResource exists and has a valid URL
    if (url) {
        // Fetching the file
        fetch(url)
            .then(response => {
                // Checking if the response is ok
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Getting the blob of the file
                return response.blob();
            })
            .then(blob => {
                // Creating a temporary link element to trigger download
                const link = document.createElement('a');

                // Creating a URL for the blob
                const url = window.URL.createObjectURL(blob);

                // Setting link attributes
                link.href = url;
                link.download = fileName || 'downloaded-file.pdf';

                // Appending to body, click, and remove
                document.body.appendChild(link);
                link.click();

                // finally cleaning up the temporary link element
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Download failed:', error);
                // Optionally showing an error message to the user
                // You might want to use a toast or snackbar to show this
                alert('Failed to download the file. Please try again.');
            });
    } else {
        // Handle case where file URL is not available
        alert('No file available for download.');
    }
};