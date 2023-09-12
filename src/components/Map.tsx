import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import Marker from "./Marker";

type Lat = number;
type Lng = number;
type Coordinates = [Lat, Lng];

export interface mapDataProps {
  allCnt: number; // 전체 구역 숫자
  bjdCode: string; //법정동 코드
  districtLevel: number; // 구역 레벨
  districtNm: string; // 구역명
  districtNmSimple: string; // 구역
  latitude: number; // 구역 위도
  longitude: number; // 구역 경도
  maintenanceSmallCnt: number; //  소규모 재건축 숫자
  reConstructionCnt: number; // 재건축 구역 숫자
  reDevelopmentCnt: number; // 재개발 구역 숫자
  streetHouseCnt: number; // 가로주택 구역 숫자
  zoneRoad: string; // 도로명 주소
}

const Map = () => {
  const [mapList, setMapList] = useState<mapDataProps[]>([]);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const mapContainer = useRef<any>(null);
  const coords: Coordinates = [37.5262411, 126.99289439];

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
        const location = new naver.maps.LatLng(...coords);

        const options = {
          center: location,
          zoom: 7,
          minZoom: 6,
        };

        const map = new naver.maps.Map(mapContainer.current, options);

        setMap(map);
        setMapList(mapData.data);
      } catch (err) {
        console.log("Err", err);
      }
    };

    MapHandler();
  }, []);

  return (
    <>
      <div
        ref={mapContainer}
        style={{ width: "100%", height: "100vh", margin: "0 auto" }}
      ></div>
      {mapList.map((item, idx) => {
        return <Marker key={idx} map={map as naver.maps.Map} mapList={item} />;
      })}
    </>
  );
};

export default Map;
