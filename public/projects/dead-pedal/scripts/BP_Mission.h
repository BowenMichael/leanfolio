class AMisisonManager;
DECLARE_DYNAMIC_MULTICAST_DELEGATE(FKMissionDelegate);

UCLASS()
class DEAD_PEDAL_2_API ABP_Mission : public AActor
{
	GENERATED_BODY()
public:	
	// Sets default values for this actor's properties
	ABP_Mission();

	/*
		Mission Bind Callbacks
	*/
	UFUNCTION(BlueprintImplementableEvent, meta = (DisplayName = "OnMissionBind"))
		void OnMissionBind(AMisisonManager* mm);

	UFUNCTION(BlueprintImplementableEvent, meta = (DisplayName = "OnMissionUnbind"))
		void OnMissionUnbind(AMisisonManager* mm);

	void BindMission(AMisisonManager* mm);
	
	/*
		Custom Events
	*/
	UFUNCTION(BlueprintImplementableEvent, meta = (DisplayName = "OnMissionStatusUpdated"))
		void OnMissionStatusUpdated();

	UFUNCTION(BlueprintImplementableEvent, meta = (DisplayName = "OnMissionComplete"))
		void OnMissionComplete();

	UFUNCTION(BlueprintImplementableEvent, meta = (DisplayName = "OnMissionFailed"))
		void OnMissionFailed();

	UFUNCTION(BlueprintImplementableEvent, meta = (DisplayName = "OnMissionStart"))
		void OnMissionStart();

	/*
		Mission Delegates
	*/
		FKMissionDelegate mdOnMissionStatusUpdate;
		FKMissionDelegate mdOnMissionComplete;
		FKMissionDelegate mdOnMissionStart;
		FKMissionDelegate mdOnMissionFailed;
protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

	/*
		Custom Event Wrappers
	*/
	UFUNCTION(BlueprintCallable)
	virtual void MissionComplete();

	UFUNCTION(BlueprintCallable)
	virtual void MissionStart();

	UFUNCTION(BlueprintCallable)
	virtual void MissionFailed();

	UFUNCTION(BlueprintCallable)
	virtual void MissionStatusUpdate();

	/*
		Common Mission Properties
	*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "MissionDetails")
	FName mMissionName;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "MissionDetails")
	FText mMissionText;

	bool missionComplete;
	AMisisonManager* mMissionManager;
	
public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

	UFUNCTION(BlueprintCallable)
		virtual bool IsMissionComplete() { return missionComplete; };

	UFUNCTION(BlueprintCallable)
		virtual void MissionLoadedComplete() { missionComplete = true; };

};
