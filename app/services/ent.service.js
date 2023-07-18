module.exports = {
  //Get Data
  async getData(id){
    const jobByID = await job.findByPk(id);
    if (!jobByID) {
      return {
        code: 404,
        message: 'Job not found',
      };
    }
    return {
      code: 200,
      data: jobByID,
    };
  },
  //Get All Data
  async getAllData(){
    const jobs = await job.findAll();
    return {
      code: 200,
      data: jobs,
    };
  }
  

}