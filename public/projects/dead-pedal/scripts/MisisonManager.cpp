// Fill out your copyright notice in the Description page of Project Settings.


#include "MisisonManager.h"
#include "BP_Mission.h"

// Sets default values
AMisisonManager::AMisisonManager()
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

}

// Called when the game starts or when spawned
void AMisisonManager::BeginPlay()
{
	Super::BeginPlay();
	
}

void AMisisonManager::BindMissionToActive(ABP_Mission* newMission)
{
	//Make sure newMission is active
	if (newMission == nullptr) {
		UE_LOG(LogTemp, Warning, TEXT("Failed to bind Mission: Mission active"));
		return;
	}

	//Set up spawn information
	FActorSpawnParameters spawnInfo;
	spawnInfo.SpawnCollisionHandlingOverride = ESpawnActorCollisionHandlingMethod::AlwaysSpawn;
	spawnInfo.Instigator = GetInstigator();

	//Spawn actor at 0,0,0
	activeMission = newMission;
	
	//Blueprint implementable callback **Needs to unbind
	activeMission->OnMissionBind((AMisisonManager*)this);

	//Bind Active Mission Delegates to Mission Manager **Needs to unbind
	activeMission->mdOnMissionStatusUpdate.AddDynamic(this, &AMisisonManager::OnMissionStatusChanged);
	activeMission->mdOnMissionComplete.AddDynamic(this, &AMisisonManager::OnMissionComplete);
	activeMission->mdOnMissionStart.AddDynamic(this, &AMisisonManager::OnMissionStart);
	activeMission->mdOnMissionFailed.AddDynamic(this, &AMisisonManager::OnMissionFailed);

}

void AMisisonManager::UnbindActiveMission()
{
	if (activeMission == nullptr) return; // No Mission to unbind

	OnMissionUnbind(); // Callback for Mission Manager before mission is unbound

	//Unbind Mission Delegates
	activeMission->mdOnMissionStatusUpdate.RemoveDynamic(this, &AMisisonManager::OnMissionStatusChanged);
	activeMission->mdOnMissionComplete.RemoveDynamic(this, &AMisisonManager::OnMissionComplete);
	activeMission->mdOnMissionStart.RemoveDynamic(this, &AMisisonManager::OnMissionStart);
	activeMission->mdOnMissionFailed.RemoveDynamic(this, &AMisisonManager::OnMissionFailed);

	//Blueprint implementable callback **Needs to unbind
	activeMission->OnMissionUnbind((AMisisonManager*)this);

	//Set Active Mission to null
	activeMission = nullptr;
}

// Called every frame
void AMisisonManager::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
}

