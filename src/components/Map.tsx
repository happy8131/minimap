import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import Marker from "./Marker";
import { copyFile } from "fs";

axios.defaults.withCredentials = true;

const MARKER_HEIGHT = 64;
const MARKER_WIDTH = 54;
const NUMBER_OF_MARKER = 13;
const SCALE = 2 / 3;

const SCALED_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALED_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

type Lat = number;
type Lng = number;
type Coordinates = [Lat, Lng];

const Map = () => {
  const [map, setMap] = useState<
    Array<{
      allCnt: Number; // 전체 구역 숫자
      bjdCode: String; //법정동 코드
      districtLevel: Number; // 구역 레벨
      districtNm: String; // 구역명
      latitude: String; // 구역 위도
      longitude: String; // 구역 경도
      maintenanceSmallCnt: Number; // 가로주택 구역 숫자
      reConstructionCnt: Number; // 재건축 구역 숫자
      reDevelopmentCnt: Number; // 재개발 구역 숫자
      zoneRoad: String; // 도로명 주소
    }>
  >([]);

  const mapContainer = useRef<any>(null);
  const lng: Coordinates = [37.5262411, 126.99289439];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position.coords);
    });

    const { naver } = window;
    const headers = {
      headers: {
        "X-Client-Id": "WoOrIgA2021",
      },
    };

    const MapHandler = async () => {
      try {
        const mapData = await axios.post(
          `${process.env.NEXT_PUBLIC_DEV_URL}district`,
          {
            swLat: 31.8732227,
            swLng: 121.77554,
            neLat: 39.9310987,
            neLng: 131.5753446,
            level: 1,
          },
          headers
        );
        const location = new naver.maps.LatLng(...lng);

        const options = {
          center: location,
          zoom: 7,
          minZoom: 6,
        };

        const map = new naver.maps.Map(mapContainer.current, options);
        for (let i = 0; i < mapData.data.length; i += 1) {
          const markerPosition = new naver.maps.LatLng(
            mapData.data[i].latitude,
            mapData.data[i].longitude
          );

          new naver.maps.Marker({
            map,
            position: markerPosition,
            title: mapData.data[i].districtNm,
            icon: {
              content: [
                '<div style="padding:3px; background-color:white;  text-align:center; border:1px solid #831616; border-radius:5px; opcatity:75%">' +
                  '<div style="background-color:#EF4E56; border-radius:3px;">' +
                  `<div style="color:white; padding-right:5px; padding-left:5px; padding-top:2px; padding-bottom:2px; font-weight:bold; background-color:#EF4E56 color:white; font-size:14px">${mapData.data[i].districtNmSimple}</div>` +
                  "</div>" +
                  `<div style="font-weight: bold; font-size:13px; margin-top:3px">${mapData.data[i].allCnt}</div>` +
                  "</div>",
              ].join(""),
              size: new naver.maps.Size(38, 58),
              anchor: new naver.maps.Point(19, 18),
            },
          });
          // let contentString = [
          //   '<div class="iw_inner">',
          //   `   <h3>${test.data[i].districtNmSimple}</h3>`,
          //   `   <p>${test.data[i].allCnt}<br>`,
          //   "   </p>",
          //   "</div>",
          // ].join("");
          // let infowindow = new naver.maps.InfoWindow({
          //   content: contentString,
          // });
          // infowindow.open(map, marker);
        }
        setMap(mapData.data);
      } catch (err) {
        console.log(err);
      }
    };

    MapHandler();

    // const markerPosition2 = new naver.maps.LatLng(
    //   37.28345582441153,
    //   127.04691015071565
    // );
    // new naver.maps.Marker({
    //   position: markerPosition2,
    //   map,
    // });
  }, []);
  // console.log(map);
  return (
    <>
      <div
        ref={mapContainer}
        style={{ width: "100%", height: "100vh", margin: "0 auto" }}
      />
    </>
  );
};

export default Map;
