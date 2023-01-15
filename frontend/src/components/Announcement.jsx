import styled from 'styled-components';
import { Wave } from 'react-animated-text';
import { mobile } from '../responsive';
const Container = styled.div`
  height: 40px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  font-weight: 500;
  background: linear-gradient(to right, #82009f 0%, #5d34af 50%, #00ceab 100%);
  border: 1px solid #ccc;
  ${mobile({ fontSize: '14px' })}
`;

const Announcement = () => {
  return (
    <Container>
      <Wave
        text='Super Deal! Free Shipping on Orders Over $50'
        effect='jump'
        effectChange={1}
        effectDuration={1.5}
        effectDelay={0.5}
        speed={50}
      />
    </Container>
  );
};

export default Announcement;
