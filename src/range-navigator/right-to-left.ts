import { loadCultureFiles } from '../common/culture-loader';
import {
    RangeNavigator, Chart, IChangedEventArgs, LineSeries, AreaSeries, DateTime, ChartTheme, RangeTooltip, Tooltip, Crosshair
} from '@syncfusion/ej2-charts';
Chart.Inject(AreaSeries, DateTime, LineSeries, Tooltip, Crosshair);
RangeNavigator.Inject(AreaSeries, DateTime, RangeTooltip);
import { Browser, Ajax } from '@syncfusion/ej2-base';

/**
 * Sample for range navigator with RTL support
 */
let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
let themes : string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentDark'];
let borderColor : string[] = ['#262E0B', '#5ECB9B', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#614570', '#8AB113'];
let regionColor : string[] = ['rgba(38, 46, 11, 0.3)', 'rgba(94, 203, 155, 0.3)', 'rgba(90, 97, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(0, 189, 174, 0.3)',
    'rgba(158, 203, 8, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(68, 114, 196, 0.3)', 'rgba(121, 236, 228, 0.3)'];


this.renderChart = (datasrc: Object[]): void => {
            let chart: Chart = new Chart(
                {
                    primaryXAxis: {
                        valueType: 'DateTime', crosshairTooltip: { enable: true }, edgeLabelPlacement: 'Shift',
                        isInversed: true, majorGridLines: { width: 0 }
                    },
                    primaryYAxis: {
                        majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelFormat: '{value}%',
                        maximum: 87, minimum: 82, interval: 1
                    },
                    chartArea: { border: { width: 0 } },
                    series: [{
                        dataSource: datasrc, xName: 'xDate', yName: 'High', width: 2, type: 'Area',
                        fill: 'url(#' + theme.toLowerCase() + '-gradient-chart)', name: 'Profit',
                        border: { width: 2, color: borderColor[themes.indexOf(theme.toLowerCase())] }
                    }],
                    tooltip: { enable: true, shared: true, header: '<b>England<b>', format: '${point.x} : <b>${point.y}<b>' },
                    height: '350',
                    width: Browser.isDevice ? '100%' : '80%',
                    theme: theme, legendSettings: { visible: false }
                }
            );
            chart.appendTo('#chart');

            let range: RangeNavigator = new RangeNavigator(
                {
                    width: Browser.isDevice ? '100%' : '80%',
                    valueType: 'DateTime',
                    tooltip: { enable: true, displayMode: 'Always' },
                    intervalType: 'Years',
                    value: [new Date('2014-01-01'), new Date('2015-12-31')],
                    series: [{
                        dataSource: datasrc, xName: 'xDate', yName: 'High', type: 'Area',
                        fill: 'url(#' + theme.toLowerCase() + '-gradient-chart)',
                        border: { width: 2, color: borderColor[themes.indexOf(theme.toLowerCase())] }
                    }],
                    enableRtl: true,
                    changed: (args: IChangedEventArgs) => {
                        chart.primaryXAxis.zoomFactor = args.zoomFactor;
                        chart.primaryXAxis.zoomPosition = args.zoomPosition;
                        chart.dataBind();
                    },
                    theme: theme
                }
            );
            range.appendTo('#container');
        };
   (window as any).default = (): void => {
    loadCultureFiles();
    let datasrc: Object[];
    let ajax: Ajax = new Ajax('./src/range-navigator/data-source/axes-data.json', 'GET', true);
    ajax.send().then();
    // Rendering Dialog on AJAX success
    ajax.onSuccess = (data: string): void => {
        datasrc = JSON.parse(data);
        datasrc.map((data: Object) => {
            // tslint:disable-next-line:no-string-literal
            data['xDate'] = new Date(data['xDate']);
        });
        this.renderChart(datasrc);
    };
};