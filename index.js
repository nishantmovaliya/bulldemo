const Bull = require('bull');


const myFirstQueue = new Bull('my-first-queue');


// Producer
const delay = 5 * 1000;
const job = myFirstQueue.add({
  foo: 'bar'
}, { delay, removeOnComplete: true });

//   const job1 = myFirstQueue.add({
//     bar: 'foo'
//   }, { delay: 3000})

// const job2 =  myFirstQueue.add([{
//   foo: 'bar'
// }, {
//   foo1: 'bar1'
// }], {delay, lifo: 'true', removeOnComplete: true});

// Consumers

myFirstQueue.process(async (job) => {
  // console.log('job..',job);
  job.update({ timeout: 1200000 });
  // job.moveToFailed({message: "string"});
  // job.fail(new Error('Job failed'));
  // job.fail('Job failed');
  // return await doSomething(job.data);
});

// const job = myFirstQueue.add({
//   foo: 'bar'
// }/* , { delay, removeOnComplete: true } */);

// queue.on('failed', (job, error) => {
//   console.log(`Job ${job.id} has failed with error: ${error.message}`);
// });
// Sometimes you need to provide job’s progress information to an external listener, this can be easily accomplished by using the progress method on the job object:
// myFirstQueue.process( async (job) => {
//   let progress = 0;
//   for(i = 0; i < 100; i++){
//     await doSomething(job.data);
//     progress += 10;
//     console.log("progress => ", progress);
//     job.progress(progress);
//   }
// });


// Listeners
// Define a local completed event
// myFirstQueue.on('completed', (job, result) => {
//   console.log(`Job completed with result ${result} ${JSON.stringify(result)}} -- jobId: ${job.id} -- job:${JSON.stringify(job.data)}`);
// })

myFirstQueue.on('stalled', (job) => {
  console.log(`Job ${job.id} has been stalled for more than ${myFirstQueue.opts.stalledInterval}ms`);
})



async function doSomething(data) {
  console.log("Producer works...", data);
  return data;
}