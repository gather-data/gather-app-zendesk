import { colors, mr } from 'gather-style';
import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const RADIUS = 20;

interface IPendingProps {
  mr?: number;
  scale?: number;
  center?: boolean;
  color?: string;
}

interface IContainerProps {
  mr?: number;
  scale?: number;
  center?: boolean;
}

const Container =
  styled.div <
  IContainerProps >
  `
  ${props => props.mr && mr(props.mr)};
  ${props =>
    props.scale &&
    `
       height: ${RADIUS * 2 * props.scale}px;
       margin-left: -${(RADIUS * 2 - RADIUS * 2 * props.scale) / 2}px;
    `};

  ${props =>
    props.center &&
    `
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  `};
`;

const StyledSVG = styled.svg`
  ${props =>
    props.scale &&
    `
     transform: scale(${props.scale});
  `};
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const PrimaryCircle = styled.circle`
  stroke-dasharray: ${2 * Math.PI * (RADIUS - 1)};
  stroke-dashoffset: ${2 * Math.PI * (RADIUS - 1) * 0.75};
  animation: ${rotate360} 0.8s linear infinite;
  transform-origin: ${RADIUS}px ${RADIUS}px;
`;

const Pending: React.SFC<IPendingProps> = ({
  center,
  color = colors.primary,
  mr: mrProp = 0,
  scale = 1,
}) => (
  <Container center={center} mr={mrProp} scale={scale}>
    <StyledSVG
      viewBox={`0 0 ${RADIUS * 2} ${RADIUS * 2}`}
      width={`${RADIUS * 2 * scale}px`}
      height={`${RADIUS * 2 * scale}px`}
      scale={scale}
      fill={color}
    >
      <circle
        cx={`${RADIUS}`}
        cy={`${RADIUS}`}
        r={`${RADIUS - 1}`}
        fill="none"
        stroke={colors.border}
        strokeWidth="2"
      />
      <PrimaryCircle
        cx={`${RADIUS}`}
        cy={`${RADIUS}`}
        r={`${RADIUS - 1}`}
        fill="none"
        stroke={color}
        strokeWidth="2"
      />
    </StyledSVG>
  </Container>
);

export default Pending;
