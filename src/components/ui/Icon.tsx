import React from "react";
import * as FontAwesome from "react-icons/fa";
import * as Md from "react-icons/md";

type Props = {
  iconName: string | null
  size?: number
  color?: string
}

const Icon = (props: Props) => {
  const { iconName, size, color } = props;
  const FaIcon: any = FontAwesome
  const MdIcon: any = Md
  let icon = null


  if (iconName) {
    const library: string = iconName.slice(0, 2)

    icon = React.createElement(library === 'Md' ? MdIcon[iconName] : library === "Fa" ? FaIcon[iconName] : MdIcon['MdDoneOutline']);
  }

  return <div style={{ fontSize: size || 17, color: color || '#141414' }}>{icon ? icon : MdIcon['MdDoneOutline']}</div>;

};

export default Icon;