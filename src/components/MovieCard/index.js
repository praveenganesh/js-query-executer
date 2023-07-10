import { useState } from "react";
import styled from "styled-components";
import FlexBox from "../FlexBox";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #242424;
  border: 1px solid #323232;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 283px;
  @media only screen and (max-width: 48rem) {
    width: 250px;
  }
  .production {
    margin: 0.2rem 0 1rem 0;
    font-size: 0.8rem;
    text-align: right;
    color: #bbbbbb;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const TitleText = styled.h2`
  color: #dbdbdb;
  font-size: ${(props) => props.fs || "1.3rem"};
  margin: 0.2rem 0;
`;
const Description = styled.div`
  color: white;
  color: #bbbbbb;
  font-size: ${(props) => props.fs || "0.85rem"};
  margin-top: ${(props) => props.mt || ""};
`;

const MovieOverViewContainer = styled.div`
  position: fixed;
  background: black;
  width: 96%;
  height: 100%;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  background: #242424;
  padding: 0rem 2rem;
  overflow: auto;

  .close-btn {
    font-weight: bold;
    color: #6f6f6f;
    font-size: 1rem;
    cursor: pointer;
  }
  @media only screen and (max-width: 48rem) {
    padding: 0 1rem;
  }
`;
const DetailsTable = styled.table`
  width: 100%;

  td {
    padding: 5px 11px;
    max-width: 300px;
    padding-bottom: 10px;
    padding-top: 7px;
    background: #353535;
    padding-left: 10px;
    overflow-wrap: break-word;
    @media only screen and (max-width: 48rem) {
      max-width: 100px;
    }
  }
  .table-value {
    background: #474747;
  }
`;

const PosterOverviewWrap = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  @media only screen and (max-width: 48rem) {
    grid-template-columns: auto;
    .wrap {
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;
    }
  }
`;

export default function MovieCard({ details }) {
  const [showOverview, setShowOverview] = useState(false);
  let { Title, Plot, Poster, Production } = details;

  const addDefaultSrc = (e) => {
    e.target.src = "/images/no_img.png";
  };

  const displayValue = (value) => {
    if (Array.isArray(value)) {
      return value.map((obj, i) => {
        return <div key={i}>{`${obj.Source}: ${obj.Value}`}</div>;
      });
    }
    return value;
  };

  const generateTableContent = () => {
    return Object.keys(details).map((key, i) => {
      if (key !== "Poster") {
        return (
          <tr key={i}>
            <td>{key}</td>
            <td class="table-value">{displayValue(details[key])}</td>
          </tr>
        );
      }
    });
  };

  const MovieOverview = () => {
    return (
      <MovieOverViewContainer>
        <div>
          <FlexBox jc="flex-end">
            <p onClick={() => setShowOverview(false)} className="close-btn">
              X
            </p>
          </FlexBox>
          <PosterOverviewWrap>
            <div className="wrap">
              <img
                onError={addDefaultSrc}
                width="250px"
                height="auto"
                src={Poster}
              />
            </div>
            <div>
              <DetailsTable>
                <tbody>{generateTableContent()}</tbody>
              </DetailsTable>
            </div>
          </PosterOverviewWrap>
        </div>
      </MovieOverViewContainer>
    );
  };
  return (
    <>
      {showOverview && <MovieOverview />}

      <Card onClick={() => setShowOverview(true)}>
        <Thumbnail onError={addDefaultSrc} src={Poster} />
        <TitleText>{Title}</TitleText>
        <span className="production">{Production}</span>
        <Description className="description">
          {`${Plot.substring(0, 100)} ...`}
        </Description>
      </Card>
    </>
  );
}
