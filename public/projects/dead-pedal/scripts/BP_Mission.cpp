#include "BP_Mission.h"

// Sets default values
ABP_Mission::ABP_Mission() :
	missionComplete(false)
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;
}

void ABP_Mission::BindMission(AMisisonManager* mm)
{
	mMissionManager = mm;
	OnMissionBind(mm);
}

// Called when the game starts or when spawned
void ABP_Mission::BeginPlay()
{
	Super::BeginPlay();
}

UFUNCTION(BlueprintCallable)
virtual void MissionComplete();

UFUNCTION(BlueprintCallable)
virtual void MissionStart();

void ABP_Mission::MissionComplete()
{
	missionComplete = true;             // Flag Mission as complete
	mdOnMissionComplete.Broadcast();    // Callback to Mission manager
	OnMissionComplete();                // Unique Mission Callback
}

void ABP_Mission::MissionStart()
{
	missionComplete = false;            // Flag Mission as not complete
	mdOnMissionStart.Broadcast();       // Callback to Mission manager
	OnMissionStart();                   // Unique Mission Callback
}

void ABP_Mission::MissionFailed()
{
	mdOnMissionStart.Broadcast();
}

void ABP_Mission::MissionStatusUpdate()
{
	mdOnMissionStatusUpdate.Broadcast();
	OnMissionStatusUpdated();
}

// Called every frame
void ABP_Mission::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
}

