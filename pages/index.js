import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchBar from '../component/SearchBar'
import axios from 'axios';
import MovieCrad from '../component/MovieCrad'

export default function Home(props) {
  const { data } = props;
  const [movieData, setMovieData] = React.useState([]);
  const [error, setError] = React.useState("")
  React.useEffect(() => {
    if (data.Search) {
      setMovieData(data.Search)
    }
  }, [data])
  async function fetchData(data) {
    if (data.filter === "All") {
      if (data.search) {
        const res = await axios.get(`http://www.omdbapi.com/?s=${data.search}&apikey=d80e5209`)
        const resData = await res.data;
        if (resData.Response == "True") {
          setMovieData(resData.Search)
          console.log(resData.Response)
        } else {
          if (resData.Error) {
            setMovieData([])
            setError(resData.Error)
          }
        }
      }
    } else {
      if (data.search) {
        const res = await axios.get(`http://www.omdbapi.com/?s=${data.search}&type=${data.filter}&apikey=d80e5209`)
        const resData = await res.data;
        if (resData.Response == "True") {
          setMovieData(resData.Search)
          console.log(resData.Response)
        } else {
          if (resData.Error) {
            setMovieData([])
            setError(resData.Error)
          }
        }
      }
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Search App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" style={{
            flexGrow: 1,
          }}>
            Home
          </Typography>
          <Button color="inherit">Favourites</Button>
        </Toolbar>
      </AppBar>
      <main>
        <SearchBar fetchData={fetchData} />

        <div style={{ display: "flex", flexFlow: "wrap", justifyContent: "center" }}>
          {movieData.length > 0 && movieData.map((item) => (
            <MovieCrad data={item} key={item.Title} />
          ))}
          {movieData.length == 0
            && (
              <p>{error}</p>
            )
          }
        </div>
      </main>




    </div>
  )
}

export async function getServerSideProps(context) {

  // Calling Api 
  const res = await axios.get(`http://www.omdbapi.com/?apikey=d80e5209`)
  const data = await res.data;
  return {
    props: { data: data }, // will be passed to the page component as props
  }
}
