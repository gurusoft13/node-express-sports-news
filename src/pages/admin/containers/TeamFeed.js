/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react'
import { useSnackbar } from 'notistack'
import TeamFeedComponent from '../components/TeamFeed'
import * as api from '../../../api'
const TeamFeed = () => {
  const [teamFeeds, setTeamFeeds] = useState([])
  const [loading, setLoading] = useState(true)
  const { enqueueSnackbar } = useSnackbar()
  const fetchData = useCallback(async () => {
    const response = await api.getTeamFeeds()
    setTeamFeeds(response.data)
    setLoading(false)
  })
  useEffect(() => {
    fetchData()
  }, [])

  const addFeed = (newData, resolve, reject) => {
    const func = async () => {
      try {
        await api.addTeamFeed(newData)
        fetchData()
        enqueueSnackbar('Successfully added', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
        resolve()
      } catch (error) {
        enqueueSnackbar('Remove Failed', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
        reject(error)
      }
    }
    func()
  }

  const updateFeed = (feedId, newData, resolve, reject) => {
    const func = async () => {
      try {
        await api.updateTeamFeed(feedId, newData)
        fetchData()
        enqueueSnackbar('Successfully updated', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
        resolve()
      } catch (error) {
        enqueueSnackbar('Update Failed', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
        reject(error)
      }
    }
    func()
  }

  const removeFeed = (feedId, resolve, reject) => {
    const func = async () => {
      try {
        await api.removeTeamFeed(feedId)
        fetchData()
        enqueueSnackbar('Successfully removed', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
        resolve()
      } catch (error) {
        enqueueSnackbar('Remove Failed', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
        reject(error)
      }
    }
    func()
  }

  return (
    <TeamFeedComponent
      loading={loading}
      teamFeeds={teamFeeds}
      addFeed={addFeed}
      updateFeed={updateFeed}
      removeFeed={removeFeed}
    />
  )
}

export default TeamFeed
