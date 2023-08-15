function fetchDetails() {
    let id = document.getElementById("idInput").value;
    if (!id) return;

    fetch('fetchDetails.php?id=' + id)
    .then(response => response.json())
    .then(data => {
        if (data && data.id) {
            document.getElementById("label").innerText = data.label == 1 ? "Approved" : "Not Approved";
            document.getElementById("id").innerText = data.id;
            document.getElementById("fea_1").innerText = data.fea_1;
            document.getElementById("fea_2").innerText = data.fea_2;
            document.getElementById("fea_3").innerText = data.fea_3;
            document.getElementById("fea_4").innerText = data.fea_4;
            document.getElementById("fea_5").innerText = data.fea_5;
            document.getElementById("fea_6").innerText = data.fea_6;
            document.getElementById("fea_7").innerText = data.fea_7;
            document.getElementById("fea_8").innerText = data.fea_8;
            document.getElementById("fea_9").innerText = data.fea_9;
            document.getElementById("fea_10").innerText = data.fea_10;
            document.getElementById("fea_11").innerText = data.fea_11;
            document.getElementById("OVD_t1").innerText = data.OVD_t1;
            document.getElementById("OVD_t2").innerText = data.OVD_t2;
            document.getElementById("OVD_t3").innerText = data.OVD_t3;
            document.getElementById("OVD_sum").innerText = data.OVD_sum;
            document.getElementById("pay_normal").innerText = data.pay_normal;
            document.getElementById("prod_code").innerText = data.prod_code;
            document.getElementById("prod_limit").innerText = data.prod_limit;
            document.getElementById("update_date").innerText = data.update_date;
            document.getElementById("new_balance").innerText = data.new_balance;
            document.getElementById("highest_balance").innerText = data.highest_balance;
            document.getElementById("report_date").innerText = data.report_date;

            document.getElementById("detailsSection").style.display = "block";

            createBarChart(data);  // Example: Bar chart for a selected feature
            createScatterPlot(data);  // Example: Scatter plot for two selected features

            document.getElementById("detailsSection").style.display = "block";
        } else {
            alert("ID not found or error fetching details.");
        }
    });
}

function createBarChart(data) {
    let ctx = document.getElementById('barChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
            datasets: [{
                label: 'Feature Values',
                data: [data.fea_1, data.fea_2, data.fea_3, data.fea_4],
                backgroundColor: ['#FF5733', '#36A2EB', '#FFCE56', '#33FF45']
            }]
        }
    });
}

function createScatterPlot(data) {
    let ctx = document.getElementById('scatterPlot').getContext('2d');
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Scatter Plot',
                data: [
                    { x: data.fea_1, y: data.fea_2 },
                    { x: data.fea_3, y: data.fea_4 }
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.5)'
            }]
        },
        options: {
            scales: {
                x: { type: 'linear', position: 'bottom' },
                y: { type: 'linear', position: 'left' }
            }
        }
    });
}
