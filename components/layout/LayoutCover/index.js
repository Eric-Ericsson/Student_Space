import Head from 'next/head'
import Navigation from '../MainNavigation'


const LayoutCover = ({ title, keyword, description, children }) => {


  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <link rel="icon" href="" />
      </Head>

      <div id="content">
        <Navigation />
      </div>
      {children}
    </div>
  )
}

export default LayoutCover

LayoutCover.defaultProps = {
  title: 'home | student space',
  description: 'Student Space',
  keyword: 'student space',
}
