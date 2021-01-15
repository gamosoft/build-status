const baseUrl = 'https://my-json-server.typicode.com/gvillar-advanced/build-status';
const numDays = 14;

const successColor = "rgb(0, 255, 0)";
const failColor = "rgb(255, 0, 0)";

function loadData(jsonData) {
    jsonData = jsonData.reverse(); // Comes in reverse order

    // Mapping chart information from dataset
    const labels = jsonData.map((e, index) => e.timestamp);
    const data = jsonData.map((e, index) => e.time);
    const color = jsonData.map((e, index) => e.success ? successColor : failColor);

    // Configuring options
    const ctx = canvas.getContext('2d');
    const config = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Build time',
                data: data,
                backgroundColor: color,
                barThickness: 20,
                borderWidth: 1
            }]
        },
        options: {
            responsive: false, // This is to be able to specify size
            legend: false,
            title: {
                display: true,
                text: `Build times in the last ${numDays} days`
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function (item, data) {
                        return `Build time was ${item.value} minutes`;
                    },
                    labelColor: function (item, chart) {
                        if (jsonData[item.index].success)
                            return {
                                borderColor: successColor,
                                backgroundColor: successColor
                            };
                        else
                            return {
                                borderColor: failColor,
                                backgroundColor: failColor
                            };
                    },
                    footer: function (items, data) {
                        // Items is a collection of all items from all datasets
                        const build = jsonData[items[0].index];
                        const environment = build.environment;
                        const status = build.success ? 'success' : 'failed';
                        return `Environment: ${environment}; Status: ${status}`;
                    },
                }
            },
            onClick: function (event, data) {
                const build = jsonData[data[0]._index];
                console.log(build); // In case we want to do something when clicking
            }
        }
    };
    const chart = new Chart(ctx, config);
}

function loadBuildHistory() {
    fetch(`${baseUrl}/buildresults?_limit=${numDays}&_sort=timestamp&_order=desc`)
    .then(response => response.json())
    .then(json => loadData(json));
}

function lastBuildStatus() {
    fetch(`${baseUrl}/buildresults?_limit=1&_sort=timestamp&_order=desc`)
        .then(response => response.json())
        .then(json => {
            const success = json[0].success;
            $('#buildStatus').removeClass('btn-secondary');
            $('#buildStatus').addClass(success ? 'btn-success' : 'btn-danger');
            $('#buildStatus').text(success ? 'Success' : 'Failed');
        });
}

$(() => {
    loadBuildHistory();
    lastBuildStatus();
});