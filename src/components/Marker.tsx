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

    new naver.maps.Marker({
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
  }, [map]);

  return null;
};

export default Marker;
