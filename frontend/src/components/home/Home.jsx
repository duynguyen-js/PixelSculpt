import { useState, useEffect } from "react"
import LoadingSpinner from "../loadingSpinner/LoadingSpinner"
import './home.scss'
import Card from '../card/Card'
import CreatePost from '../createPost/CreatePost'
import FormField from "../createPost/formField/FormField";
import RenderCards from "./renderCards/RenderCards";
import { search } from "../../assets/index"

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchTimeOut, setSearchTimeOut] = useState(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "GET",
          headers: {
            "CONTENT-TYPE": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };


    fetchAllPosts();
  }, []);

const handleSearchChange = (e) => {
  clearTimeout(searchTimeOut)
  const inputValue = e.target.value;

  setSearch(inputValue);

  setSearchTimeOut(
    setTimeout(() => {
      const searchResults = allPosts.filter(
        (item) =>
          item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          item.prompt.toLowerCase().includes(inputValue.toLowerCase())
      );

      setSearchResults(searchResults);
    }, 500)
  );
};


  return (
    <section>
      <div className="text-container">
        <h1>The Community Showcase</h1>
        <p className="hero-text">
          Explore a gallery of visually captivating images crafted by actual
          users through the innovative DALL-E AI.
        </p>
      </div>

      <div className="form-field-container">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder={search}
          value={search}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="loading-container">
        {loading ? (
          <LoadingSpinner loading={loading} />
        ) : (
          <>
            {search && (
              <h2 className="search-text">
                Displaying results for: <span>{search}</span>
              </h2>
            )}

            <div className="image-grid">
              {search ? (
                <RenderCards
                  data={searchResults}
                  title="No search results found"
                />
              ) : (
                <RenderCards data={allPosts} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Home