const { events, Job } = require("brigadier");

events.on("image_push", function(e, project) {
  var docker = JSON.parse(e.payload)

  if (docker.push_data.tag != "latest") {
    console.log(`ignoring non-master build for branch ${docker.push_data.tag}`)
    return
  }
  
  var update = new Job("update", "python:3")
  update.tasks = [
    "pip install kubernetes",
    "python /src/.brigade/update.py"
  ]
  
  var notify = new Job("notify", "alpine:3.4")
  notify.env.CHATKEY = project.secrets.chatKey
  notify.tasks = [
    "apk update && apk add curl",
    "curl -X POST -H 'Content-Type: application/json' --data '{\"username\":\"Brigade\",\"icon_emoji\":\":k8s:\",\"text\":\"Directory prod deployment updated.\",\"attachments\":[{\"title\":\"https://profile.gccollab.ca\",\"title_link\": \"https://profile.gccollab.ca\",\"text\": \"Rolling update in progress.\",\"color\":\"#764FA5\"}]}' https://message.gccollab.ca/hooks/$CHATKEY"      //rocket chat notification webhook
  ]
  
  update.run().then(() => { notify.run() })
})
