import React from "react";
import MenuItem from "../menu-item/menu-item.component";
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selectors'
import { connect } from "react-redux";

import { DirectoryMenuContainer } from './directory.styles';

const Directory = ( { sections }) => (
  <DirectoryMenuContainer>
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </DirectoryMenuContainer>
);


const mapSateToProps = createStructuredSelector({
  sections:selectDirectorySections
})

export default connect(mapSateToProps)(Directory);
