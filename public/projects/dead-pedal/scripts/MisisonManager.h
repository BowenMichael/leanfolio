// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "MisisonManager.generated.h"

class ABP_Mission;

UCLASS()
class DEAD_PEDAL_2_API AMisisonManager : public AActor
{
	GENERATED_BODY()
	
public:	
	// Sets default values for this actor's properties
	AMisisonManager();

	/*
		Mission Event Callbacks
	*/
	UFUNCTION(BlueprintImplementableEvent, meta = (DisplayName = "OnMissionStatusChanged"))
	void OnMissionStatusChanged();

	UFUNCTION(BlueprintImplementableEvent, meta = (DisplayName = "OnMissionComplete"))
	void OnMissionComplete();

	UFUNCTION(BlueprintImplementableEvent, meta = (DisplayName = "OnMissionFailed"))
	void OnMissionFailed();

	UFUNCTION(BlueprintImplementableEvent, meta = (DisplayName = "OnMissionStart"))
		void OnMissionStart();
	
	UFUNCTION(BlueprintImplementableEvent, meta = (DisplayName = "OnMissionUnBind"))
		void OnMissionUnbind();


protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

	/*
		Mission Binding
	*/
	UFUNCTION(BlueprintCallable)
	void BindMissionToActive(ABP_Mission* newMission);

	UFUNCTION(BlueprintCallable)
	void UnbindActiveMission();


	UPROPERTY(Instanced, EditAnywhere, BlueprintReadOnly, Category = "Mission")
	ABP_Mission* activeMission;
	

private:

	
public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

};
