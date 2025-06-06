function calculate() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const operator = document.getElementById("operation").value;
    const resultDiv = document.getElementById("result");

    if (isNaN(num1) || isNaN(num2)) {
        resultDiv.textContent = "Please enter valid numbers.";
        return;
    }
    //Axios was installed using npm to manage dependencies. Since we have not yet learned bundlers,
    // the CDN version of Axios is used in the browser to enable functional API communication on the front-end.
    axios
        .get(`/calculator/${operator}?num1=${num1}&num2=${num2}`)
        .then((response) => {
            resultDiv.textContent = `Result: ${response.data.result}`;
        })
        .catch((error) => {
            resultDiv.textContent = `Error: ${error.response?.data?.message || "Error"}`;
        });
}
