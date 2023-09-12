import { useEffect } from "react";
import { mapDataProps } from "./Map";
import styles from "@/styles/Home.module.css";
interface MarkerProps {
  map: naver.maps.Map;
  mapList: mapDataProps;
}

const Marker = ({ map, mapList }: MarkerProps) => {
  useEffect(() => {
    const markerPosition = new naver.maps.LatLng(
      mapList.latitude,
      mapList.longitude
    );
    const contentTags = `<div style="text-align:center;">${mapList.districtNmSimple}</div> 
    <div style="padding-right:5px; padding-left:5px; padding-bottom:5px; font-size:14px; background-color:#FFFFFF;">재개발: ${mapList.reDevelopmentCnt} 소규모재건축: ${mapList.maintenanceSmallCnt}
    <div>재건축: ${mapList.reConstructionCnt} 가로주택: ${mapList.streetHouseCnt}</div></div>`;

    const infowindow = new naver.maps.InfoWindow({
      content: contentTags,
    });

    const marker: naver.maps.Marker = new naver.maps.Marker({
      map,
      position: markerPosition,
      title: mapList.districtNm,
      icon: {
        content: [
          `<div class=${styles.container}>` +
            `<div class=${styles.tooltip}>` +
            `<div class=${styles.containerSub}>` +
            `<div class=${styles.cityName}>${mapList.districtNmSimple}</div>` +
            `<div class=${styles.tooltiptext}>재개발: ${mapList.reDevelopmentCnt} 소규모재건축: ${mapList.maintenanceSmallCnt} <div style="">재건축: ${mapList.reConstructionCnt} 가로주택: ${mapList.streetHouseCnt}</div> </div>` +
            "</div>" +
            `<div class=${styles.allCnt}>${mapList.allCnt}</div>` +
            "</div>" +
            "</div>",
        ].join(""),
        size: new naver.maps.Size(38, 58),
        anchor: new naver.maps.Point(19, 18),
      },
    });
    // `<div class=${styles.container}>` +
    // `<div class=${styles.tooltip}>` +
    // `<div class=${styles.containerSub}>` +
    // `<div class=${styles.cityName}>${mapList.districtNmSimple}</div>` +
    // `<div class=${styles.tooltiptext}>재개발: ${mapList.reDevelopmentCnt} 소규모재건축: ${mapList.maintenanceSmallCnt} <div style="">재건축: ${mapList.reConstructionCnt} 가로주택: ${mapList.streetHouseCnt}</div> </div>` +
    // "</div>" +
    // `<div class=${styles.allCnt}>${mapList.allCnt}</div>` +
    // "</div>" +
    // "</div>",
    // naver.maps.Event.addListener(marker, "click", function (e) {
    //   if (infowindow.getMap()) {
    //     infowindow.close();
    //   } else {
    //     infowindow.open(map, marker);
    //   }
    // });
  }, [map]);

  return null;
};

export default Marker;
