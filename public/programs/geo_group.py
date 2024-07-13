from nada_dsl import *

def nada_main():

    user = Party(name="user")
    connection = Party(name="connection")

    lat = SecretInteger(Input(name="lat", party=user))
    lng = SecretInteger(Input(name="lng", party=user))
    rank = PublicInteger(Input(name="rank", party=connection))
    
    if rank is 1:
        # return exact location
        return [Output(lat, "location", connection), Output(lng, "location", connection)]
    if rank is 2:
        # todo: cal city based on lat / lng
        latBrussels = 50.8476
        lngBrussles = 4.3572
        return [Output(latBrussels, "location", connection), Output(lngBrussles, "location", connection)]
    return [Output(rank, "rank", connection)]