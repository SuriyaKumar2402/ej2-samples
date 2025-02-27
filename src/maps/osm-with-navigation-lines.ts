// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * Bubble sample
 */
import { Maps, Bubble, Marker, MapsTooltip, MapsTheme, ILoadEventArgs, Zoom, NavigationLine } from '@syncfusion/ej2-maps';
Maps.Inject(Bubble, MapsTooltip, NavigationLine, Zoom, Marker);
// custom code start
//tslint:disable:max-func-body-length
// custom code end
export interface Data {
    value ?: number;
}
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let maps: Maps = new Maps({
        // custom code start
        load: (args: ILoadEventArgs) => {
            let theme: string = location.hash.split('/')[1];
            theme = theme ? theme : 'Material';
            args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        },
        // custom code end
        titleSettings: {
            text: 'Flight route from Los Angeles to Mexico city',
            textStyle: {
                size: '16px',
                fontFamily: 'Segoe UI'
            }
        },
        zoomSettings: {
            zoomFactor: 5,
            enable: false
        },
        centerPosition: {
            latitude: 27.0902,
            longitude: -105.7129
        },
        annotations: [{
            content: '<div style="height:18px;width:170px;background:white;text-align:center">' +
                '<a href="https://www.openstreetmap.org/copyright"  target = "_blank" > © OpenStreetMap contributors </a></div > ',
            verticalAlignment: 'Far',
            zIndex: '1',
            x: '-40',
            y: '-20',
            horizontalAlignment: 'Far'
        }],
        layers: [
            {
                layerType: 'OSM',
                markerSettings: [
                    {
                        visible: true,
                        template: '<div><img src="src/maps/images/group.svg" style="height:15px;width:15px;"></img></div>',
                        dataSource: [{
                                name: 'Mexico City',
                                latitude: 23.6445,
                                longitude: -102.832
                            }],
                        tooltipSettings: {
                            visible: true,
                            valuePath: 'name',
                            textStyle: {
                                fontFamily: 'Segoe UI'
                            }
                        }
                    },
                    {
                        visible: true,
                        template: '<div><img src="src/maps/images/ballon.png" style="height:30px;width:20px;"></img></div>',
                        dataSource: [{
                                name: 'Mexico City',
                                latitude: 24.2005,
                                longitude: -102.832
                            }],
                        tooltipSettings: {
                            visible: true,
                            valuePath: 'name',
                            textStyle: {
                                fontFamily: 'Segoe UI'
                            }
                        }
                    },
                    {
                        visible: true,
                        template: '<div style= "font-weight:500; font-size: 13px; text-align: left; font-family:Segoe UI;">Mexico</div>',
                        dataSource: [{
                                name: 'Mexico City',
                                latitude: 24.0005,
                                longitude: -101.200
                            }],
                    },
                    {
                        visible: true,
                        template: '<div><img src="src/maps/images/oval.svg" style="height:15px;width:15px;"></img></div>',
                        dataSource: [{
                                name: 'Los Angeles',
                                latitude: 34.0522,
                                longitude: -118.2437
                            }],
                        tooltipSettings: {
                            visible: true,
                            valuePath: 'name',
                            textStyle: {
                                fontFamily: 'Segoe UI'
                            }
                        }
                    },
                    {
                        visible: true,
                        template: '<div><div style="text-align: right; font-weight:500; font-size: 13px; font-family:Segoe UI;">Los Angeles</br>' +
                        'International Airport</div></div>',
                        dataSource: [{
                                name: 'Los Angeles City',
                                latitude: 34.7000,
                                longitude: -121.5000
                            }],
                    },
                    {
                        visible: true,
                        template: '<div><img src="src/maps/images/map-tooltip.svg" style="height:50px;width:100px;"></img></div>',
                        dataSource: [{
                                latitude: 28.5,
                                longitude: -110.400
                            }],
                    }
                ],
                navigationLineSettings: [{
                        width: 8,
                        visible: true,
                        angle: -0.05,
                        color: '#00ace6',
                        latitude: [23.6445, 34.0522],
                        longitude: [-102.832, -118.2437]
                    }]
            }
        ]
    });
    maps.appendTo('#container');
};