export const historyOptions = {
    lineHeightAnnotation: {
        always: true,
        hover: false,
        lineWeight: 1.5,
    },

    animation: {
        duration: 0,
    },

    maintainAspectRatio: false,

    responsive: true,

    legend: {
        labels: {
            fontColor: "#bd93f9",
        },
    },

    scales: {
        xAxes: [
            {
                ticks: { fontColor: "#bd93f9" },
                type: "time",
                distribution: "linear",
            },
        ],
        yAxes: [
            {
                ticks: { fontColor: "#bd93f9" },
                distribution: "linear",
            },
        ],
    },
};
