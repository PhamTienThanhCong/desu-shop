import styled from 'styled-components';
import Newsletter from '../components/Newsletter';
import { useState, useEffect } from 'react';
import GoogleMaps from '../components/GoogleMaps';
import { listShowrom } from "../data";
const Title = styled.h1`
  margin: 20px;
`;
const Wrapper = styled.div`

`;
const StoreInfo = styled.div`
width: 100%;
height: 10%;
min-height: 300px;
display: flex;
// flex: 1 auto;
padding: 20px;
border: 1px solid #ccc;
border-radius: 20px;
`
const StoreImg = styled.div`
display: flex;
width:100%;
max-height:400px;
min-width: 300px;
`;
const StoreDesp = styled.div`
padding: 10px;
`
const Image = styled.img`
width: 100%;
`
const ShowroomWrapper = styled.div`
margin: 30px 0;
display: flex;
gap: 50px;
min-height: 650px;
flex-direction: row;
`;

const ListShowroom = styled.div`
padding: 20px  0;
`;

const ShowroomItem = styled.div`
margin: 20px 0;
display: flex;
flex-direction: column;
border: 1px solid #dedede;
background: #fafafa;
padding: 10px;
cursor: pointer;
`;
const StoreMeta = styled.div`
  display: flex;
  font-size: 12px;
  margin-right: 5px;
  align-items: center;
  text-decoration: none;
  gap: 10px;
`;
const StoreItem = styled.a`
  display: flex;
`;
const SearchShowroom = styled.input`
  background: #ffffff;
  background-clip: padding-box;
  border: 1px solid #c2c2c2;
  border-radius: 1px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  height: 32px;
  line-height: 1.42857143;
  padding: 0 9px;
  vertical-align: baseline;
  width: 100%;
  min-width: 450px;
  box-sizing: border-box;
`;


const About = () => {
  const [location, setLocation] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  useEffect(() => {
    listShowrom ? setLocation(listShowrom[0]) : null;
    listShowrom ? setFilteredArray(listShowrom) : null;
  }, []);

  const handleChooseShowroom = (showroom) => {
    setLocation(showroom);
  };



  const filltersShowroom = (objects, input) => {

    let ar = objects.filter(item => {
      const value = input.toLowerCase();
      const address = item?.address.toLowerCase();
      return address.includes(value)
    });

    setFilteredArray(ar);
  }
  return (<>
    <Title>About us</Title>
    <Wrapper>
      <StoreInfo>
        <StoreImg>
          <Image src={'./asset/img/about-us.jpg'} />

        </StoreImg>
        <StoreDesp>
          <h1>NHAT SHOP</h1>
          <div>
            Hệ thống NHAT SHOP đã trở thành một trong những website chuyên bán lẻ các thiết bị
            di động có tên tuổi tại thị trường Việt Nam, với các chi nhánh tại TP.HCM, Đà Nẵng. Với khát khao mang tới
            sự hài lòng tuyệt đối cho khách hàng, phát triển thương hiệu bằng giá trị cốt lõi là niềm tin của khách hàng,
            công ty luôn cố gắng nỗ lực để cập nhật, phát triển không ngừng nghỉ.
          </div>
        </StoreDesp>
      </StoreInfo>
      <ShowroomWrapper>
        <ListShowroom>
          <h2>Showroom List</h2>
          <SearchShowroom onKeyUp={(event) => filltersShowroom(listShowrom, event.target.value)}
          >
          </SearchShowroom>
          {filteredArray.map((s) =>
            <ShowroomItem key={s.id} onClick={() => { handleChooseShowroom(s) }}>
              <div style={{ fontWeight: 'bold' }}>
                {s.name} {s.address}
              </div>
              <div>
                {s.address}
              </div>
              <StoreMeta>
                <StoreItem href={`tel:${s.phone}`}>Gọi ngay</StoreItem>
                <StoreItem className="go-zalo" href="https://zalo.me/2858385037676592618" target="_blank" rel="nofollow">
                  <div style={{ margin: '0 5px 0 0' }}> <img style={{ width: '12px' }} src={'./asset/img/zalo.svg'} /></div>Chat Zalo
                </StoreItem>
                <StoreItem className="go-map" target="_blank" rel="nofollow" href={`https://www.google.com/maps?saddr=${s?.center.lat}, 
                  ${s?.center.lng}&daddr=${s?.center.lat}, 
                  ${s?.center.lng}`}>
                  <div>  <img style={{ width: '12px' }} src={'./asset/img/map.svg'} />
                  </div>Tìm đường đi
                </StoreItem>
              </StoreMeta>
            </ShowroomItem>
          )}
        </ListShowroom>
        <GoogleMaps location={location} />
      </ShowroomWrapper>
    </Wrapper>
    <Newsletter />
  </>)
}
export default About;