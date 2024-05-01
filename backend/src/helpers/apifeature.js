import ApiError from '~/utils/ApiError'
async function performCRUD(model, action, data, id_index = 'id') {
  switch (action.toLowerCase()) {
  case 'create':
    try {
      const createdRecord = await model.create(data)
      return createdRecord
    } catch (error) {
      console.log(error)
      return ApiError(`Error creating record: ${error.message}`)
    }
  case 'update':
    try {
      const { ...updateData } = data
      const updatedRecord = await model.update(updateData, {
        where: { [id_index]: data[id_index] }
      })
      if (updatedRecord[0] === 0) {
        return ApiError('Record with id not found.')
      }

      data = await model.findOne({
        where: { [id_index]: data[id_index] },
        attributes: { exclude: ['password'] }
      })

      return data
    } catch (error) {
      return ApiError(`Error updating record: ${error.message}`)
    }
  case 'delete':
    try {
      const deletedRecordCount = await model.destroy({
        where: { [id_index]: data[id_index] }
      })
      if (deletedRecordCount === 0) {
        return ApiError('Record with id not found.')
      }
      return { message: 'Record deleted successfully.' }
    } catch (error) {
      return ApiError(`Error deleting record: ${error.message}`)
    }
  default:
    return ApiError(`Invalid action: ${action}`)
  }
}

export default performCRUD
