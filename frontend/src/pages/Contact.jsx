import styled from 'styled-components';
import Newsletter from '../components/Newsletter';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
const Title = styled.h1`
  margin: 20px;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 30px;
  min-height: 650px;
  flex-direction: row;
  text-align: start;
  border: 1px solid #ddd;
  border-radius: 10px; 
  margin-bottom: 20px;
`;
const ContactInfo = styled.div`
  padding: 20px;
  flex: 1;
`;

const ContactForm = styled.div`
  width: 100%;
  padding: 20px;
  flex: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin-bottom: 21px;
  padding: 14px 14px 10px;
  justify-content: center;
`;
const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin: 10px 0;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  padding: 10px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
  margin: auto;
`;

const Description = styled.div`
  background-image: url(//cdn.tgdd.vn/mwgcart/mwg-site/ContentMwg/images/other/icon-contact-info-quote.png);
  background-position: left top;
  background-repeat: no-repeat;
  border-bottom: 1px solid #ddd;
  color: #666;
//   font-size: 14px;
  line-height: 20px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  padding-left: 54px;
`;
const Content = styled.div``;
const Tel = styled.span`
  color: #f60;
  font-weight: bold;
`;
const Label = styled.span`
  float: left;
  text-align: right;
  padding-right: 5px;
  width: 100px;
`;
const Error = styled.span`
  color: red;
  font-size: 14px;
`;

const Textarea = styled.textarea`
  height: 100px;
  padding: 0;
  padding: 5px;
  flex: 1;
  min-width: 40%;
  padding: 10px;
`;
const InputContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const Contact = () => {
  const [isSending, setIsending] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setIsending(true);
    alert('Thank you for your contact information!');
    setIsending(false);
    reset();
  };

  return (
    <>
      <Title>Contact us</Title>
      <Wrapper>
        <ContactInfo>
          <h3>Contact Infomation</h3>
          <Description>
            Tìm kiếm siêu thị NHAT SHOP? Vui lòng truy cập trang "Giới thiệu về chúng tôi" của chúng tôi tại <Link to='/about'>đây</Link> để xem bản đồ và địa chỉ của các siêu thị của chúng tôi trên toàn quốc.
          </Description>
          <Content>
            <p>Address: Cộng Hòa, Phường 13, Tân Bình, TP.HCM
            </p>
            <p>
              Phone: <Tel>1 234 56 78</Tel>
            </p>
            <p>
              Email: <Tel>contact@nhatshop.dev</Tel>
            </p>
          </Content>
        </ContactInfo>
        <ContactForm>
          <h3>Contact Form</h3>
          <Description>
          Vui lòng điền vào biểu mẫu nếu bạn có bất kỳ phản hồi hoặc yêu cầu nào.<br/>
          Thank you.
          </Description>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
              <Label>Title*</Label>
              <InputContainer>
                <Input
                  placeholder='title'
                  {...register('title', { required: true })}
                />
                {errors.title && <Error>This field is required</Error>}
              </InputContainer>
            </FormRow>
            <FormRow>
              <Label>Content*</Label>
              <InputContainer>
                <Textarea
                  placeholder='content'
                  {...register('content', { required: true })}
                />
                {errors.content && <Error>This field is required</Error>}
              </InputContainer>
            </FormRow>
            <FormRow>
              <Label>Full name*</Label>
              <InputContainer>
                <Input
                  placeholder='fullname'
                  {...register('fullname', { required: true })}
                />
                {errors.fullname && <Error>This field is required</Error>}
              </InputContainer>
            </FormRow>
            <FormRow>
              <Label>Email*</Label>{' '}
              <InputContainer>
                <Input
                  placeholder='email'
                  type='email'
                  {...register('email', { required: true })}
                />
                {errors.email && <Error>This field is required</Error>}
              </InputContainer>
            </FormRow>
            <FormRow>
              <Label>Phone*</Label>
              <InputContainer>
                <Input
                  placeholder='phone'
                  type='phone'
                  {...register('phone', { required: true })}
                />
                {errors.phone && <Error>This field is required</Error>}
              </InputContainer>
            </FormRow>
            <Button type='submit'>Send</Button>
          </Form>
        </ContactForm>
      </Wrapper>
      <Newsletter />
    </>
  );
};
export default Contact;
