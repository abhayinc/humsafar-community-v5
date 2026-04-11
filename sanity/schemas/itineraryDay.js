export default {
  name: 'itineraryDay',
  title: 'Itinerary Day',
  type: 'object',
  fields: [
    { name: 'day', title: 'Day Number', type: 'number' },
    { name: 'title', title: 'Day Title', type: 'string' },
    { name: 'desc', title: 'Description', type: 'text' },
    { name: 'meals', title: 'Meals Included', type: 'string' }
  ]
}
