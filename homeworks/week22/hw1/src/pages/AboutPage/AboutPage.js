import styled from "styled-components";
import banner from "../../images/banner.jpeg";
import logo from "../../images/logo.jpeg";

const Background = styled.div`
  position: relative;
  background-image: url(${banner});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  height: calc(100vh - 100px);
  width: 90%;
  margin: auto;

  @media screen and (max-width: 576px) {
    height: 100vh;
    margin: 100px auto 60px auto;
  }

  @media screen and (max-width: 768px) {
    margin: 100px auto 60px auto;
  }
`;

const InfoBackground = styled.div`
  position: absolute;
  max-width: 500px;
  background: transparent;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: "Playfair Display", serif;
`;

const InfoContent = styled.div`
  margin-top: 80px;
  line-height: 2;
  color: #440f00;
  font-size: 20px;
  text-align: center;

  span {
    font-weight: bold;
  }

  @media screen and (max-width: 576px) {
    line-height: 1.5;
    margin-top: 120px;
  }
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 576px) {
    margin: 50px 0;
  }
`;

function AboutPage() {
  return (
    <Background>
      <InfoBackground>
        <Avatar src={logo} />
        <InfoContent>
          <span>Orange & Black</span> <br />
          <span>Optimistic & Brave</span> <br />
          <p>
            We love when inspiring people share their stories on our site.{" "}
            Although sharing and listening to stories makes us stop and reflect,
            it can also lead to us thinking and acting differently.
          </p>
        </InfoContent>
      </InfoBackground>
    </Background>
  );
}

export default AboutPage;
