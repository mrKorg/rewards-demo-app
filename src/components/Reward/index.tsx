import React from "react";

import "./style.css";
import { Reward } from "store/types";

interface Props {
  data: Reward;
}

export default function RewardComponent({ data }: Props) {
  return <div>{data.experience && <p>{data.experience}</p>}</div>;
}
