import { createSelector } from 'reselect'
import moment from 'moment'

export const select = state => ({
  ...state,
  milestones: getMilestonesWithActivities(state),
})

const getState = state => state

export const getMilestonesWithActivities = createSelector(
  [getState],
  (milestones, activities, projects, users, domainConfiguration) => Object.values(milestones)
    .map(milestone => {
      const milestoneActivities = Object.values(activities)
        .filter(activity => activity.milestoneId === milestone.milestoneId)
        .map(activity => ({ ...activity, effort: moment(activity.endTime).diff(moment(activity.startTime), 'minutes') }))
        .sort((a, b) => {
          if (moment(a.startTime).isBefore(b.startTime))
            return -1
          return 1
        })
      return {
        ...milestone,
        activities: milestoneActivities,
        invoicingProperties: calculateInvoicingProperties({ milestone, activities: milestoneActivities, projects, users, domainConfiguration }),
      }
    })
    .reduce((obj, milestone) => ({ ...obj, [milestone.milestoneId + '']: milestone }), {}),
)
