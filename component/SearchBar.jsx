import React from "react";

function SearchBar(props) {
  const [state, setState] = React.useState({
    search: "",
    filter: "All",
  });

  function handleSubmit(event) {
    event.preventDefault();
    props.fetchData(state);
  }

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }
  return (
    <div style={{ marginTop: 10, textAlign: "center" }}>
      <form onSubmit={handleSubmit} autoComplete="off" noValidate>
        <input
          type="text"
          name="search"
          value={state.search}
          onChange={handleChange}
          required
          placeholder={"Search for movies"}
          style={{ marginRight: 5, marginBottom: 5 }}
        />
        <select
          name="filter"
          onChange={handleChange}
          value={state.filter}
          style={{ marginRight: 5 }}
        >
          <option>All</option>
          <option>movie</option>
          <option>series</option>
          <option>episode</option>
        </select>
        <button type="submit" disabled={!(state.search || state.filter)}>
          Search{" "}
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
