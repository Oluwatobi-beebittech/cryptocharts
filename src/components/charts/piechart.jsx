import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function CryptoPie(props) {
  const crypto = [];
  props.cryptoList.map((cryptoObj) => {
    crypto.push({
      name: cryptoObj.coin,
      y: parseInt(cryptoObj.value),
      sliced: true,
    });
    return 0;
  });
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    title: {
      text: "Portfolio Chart",
    },
    series: [
      {
        name: "CryptoCurrencies",
        colorByPoint: true,
        data: crypto,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
