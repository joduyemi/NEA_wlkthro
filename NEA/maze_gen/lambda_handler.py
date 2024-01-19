from .generate import generate_maze
import json
def handle_maze_generation_event(event):
    '''
    calls the necessary functions to respond to a correctly formatted request sent to the linked API endpoint
    '''
    # takes in 'event' - the data passed into the function - if correctly formatted, it extracts these two bits of data
    if event["event"] == "maze_generation":
        n = event["n"]
        sideLen = event["sideLen"]
        
        try:
            return_array = generate_maze(n, sideLen)
            return {"status": "success", "maze": return_array}
        except Exception as e:
            return {"status": "error", "error_message": str(e)}

def lambda_handler(event, context):
    '''
    returns the data produced by the relevant functions - must be called lambda_handler since this is in AWS regulations
    '''

    try:
        this_event = handle_maze_generation_event(event)
        # uses a 500 status code if there is an error - much like a catch all
        status_code = 200 if this_event["status"] == "success" else 500
        return {
            "statusCode": status_code,
            "body": json.dumps(this_event)
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"status": "error", "error_message": str(e)})

        }