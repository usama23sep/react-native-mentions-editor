import React from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, FlatList, Animated, View } from "react-native";

import MentionListItem from "../MentionListItem";
// Styles
import styles from "./MentionListStyles";
import { Text } from "react-native";

export class MentionList extends React.PureComponent {
  static propTypes = {
    list: PropTypes.array,
    editorStyles: PropTypes.object,
    isTrackingStarted: PropTypes.bool,
    suggestions: PropTypes.array,
    keyword: PropTypes.string,
    onSuggestionTap: PropTypes.func
  };

  constructor() {
    super();
    this.previousChar = " ";
  }

  renderSuggestionsRow = ({ item }) => {
    return (
      <MentionListItem
        onSuggestionTap={this.props.onSuggestionTap}
        item={item}
        editorStyles={this.props.editorStyles}
      />
    );
  };
  render() {
    const { props } = this;

    const { keyword, isTrackingStarted } = props;
    const withoutAtKeyword = keyword.substr(1, keyword.length);
    const list = this.props.list;
    const suggestions =
      withoutAtKeyword !== ""
        ? list.filter(user => user.firstname.includes(withoutAtKeyword))
        : list;
    if (!isTrackingStarted) {
      return null;
    }
    return (
      <Animated.View
        style={[
          { ...styles.suggestionsPanelStyle },
          this.props.editorStyles.mentionsListWrapper
        ]}
      >
        <FlatList
          style={styles.mentionsListContainer}
          keyboardShouldPersistTaps={"always"}
          horizontal={false}
          ListEmptyComponent={
            <View style={styles.loaderContainer}>
              <ActivityIndicator />
              <Text style={{textAlign:'center'}}>The professional you are trying to tag does not exist or you are not following them</Text>
            </View>
          }
          enableEmptySections={true}
          data={suggestions}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={rowData => {
            return this.renderSuggestionsRow(rowData);
          }}
        />
      </Animated.View>
    );
  }
}

export default MentionList;
