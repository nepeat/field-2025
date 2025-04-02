--- adding kind, parsed from the existing backend message
UPDATE field_messages 
SET kind = backend_message #>> '{subscribe,data,payload,msg,type}'
WHERE kind='unknown';