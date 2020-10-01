import React, { useState } from "react";
import classnames from "classnames";
// you should import `lodash` as a whole module
import lodash from "lodash";
import axios from "axios";

import { GetRandomList } from "./mock";

const ITEMS_API_URL = "https://example.com/api/items";
const DEBOUNCE_DELAY = 500;

// store the time that the last input was added
// set an event to trigger 500ms after that time (setTimeout?)
// reset that trigger every time a key is pressed

const Autocomplete = () => {
  const [response, setResponse] = useState(undefined);
  const [userSearchInput, setUserSearchInput] = useState(undefined);
  const [timer, setTimer] = useState(undefined);
  // const [latestQuery, setLatestQuery]

  // when timer finishes, call the API with current search input
  const delay = () => {
    return setTimeout(() => {
      getResponse(userSearchInput);
    }, DEBOUNCE_DELAY);
  };

  const handleInputEvent = async (e) => {
    const currentUserInput = e.target.value;
    setUserSearchInput(currentUserInput);

    // on input: reset timer to 500ms
    clearTimeout(timer);
    setTimer(delay());
  };

  const getResponse = async (searchQuery) => {
    // const result = await axios.get(ITEMS_API_URL);
    const result = await GetRandomList();

    setResponse(result);
  };

  const ListItem = (props) => {
    const { item } = props;
    return <div className="list-item">{item}</div>;
  };

  const SearchResultList = () => {
    if (!response || response.length === 0) {
      return null;
    }

    return (
      <div className="list is-hoverable">
        {response.map((item) => (
          <ListItem item={item} />
        ))}
      </div>
    );
  };

  return (
    <div className="wrapper">
      <div className={timer ? "control is-loading" : "control"}>
        <input onChange={handleInputEvent} type="text" className="input" />
      </div>
      <SearchResultList />
    </div>
  );
};

export default Autocomplete;
