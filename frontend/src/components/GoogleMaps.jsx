import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import PlaceIcon from '@mui/icons-material/Place';

const GooogleMapWrapper = styled.div`
width: 100%;
padding: 20px 0;
position: relative;
`;


const defaultProps = {
  center: {
    lat: 10.760554554121498,
    lng: 106.65415099195408
  },
  zoom: 13
};

const Position = styled.div`
top: 30px;
left: 30px;
z-index: 10;
position: absolute;
max-width: 250px;
background-color: white;
padding: 10px;
box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
border-radius: 2px;
font-size: 14px;
`;

const Text = styled.span`

`;

const Marker = ({ icon }) => <div>{icon}</div>;

const GoogleMaps = ({ location }) => {
  return (<>
    <GooogleMapWrapper>
      <Position><Text>{location?.address}</Text></Position>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_MAPS_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        center={location.center}
      >
        {location ?
          <Marker width={'30px'}
            lat={location?.center?.lat}
            lng={location?.center?.lng}
            icon={<PlaceIcon style={{ color: '#e30000', fontSize: '30px', top: 0, left: 0 }}></PlaceIcon>}
          ></Marker>
          : null
        }
      </GoogleMapReact>
    </GooogleMapWrapper>
  </>)
}
export default GoogleMaps;