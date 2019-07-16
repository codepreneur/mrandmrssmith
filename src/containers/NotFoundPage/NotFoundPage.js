import React from 'react'

import { Helmet } from 'react-helmet-async'

import MainLayout from '../MainLayout'
import AppToolbar from '../../components/AppToolbar'
import StateMessage from '../../components/StateMessage'

const title = 'Page Not Found'
const description =
  'The page you are looking for does not exist or you might not have an access to.'

const NotFoundPage = () => (
  <MainLayout appBar={<AppToolbar />}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <StateMessage title={title} description={description} />
  </MainLayout>
)

export default NotFoundPage
