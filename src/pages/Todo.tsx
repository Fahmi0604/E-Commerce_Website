import { IonItemOptions, IonItemSliding, IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar, IonText, IonAvatar, IonLabel, IonItemOption, IonButton, IonIcon, IonInput, IonFab, IonFabButton, IonCheckbox, IonModal, IonButtons, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption, IonChip, IonDatetime } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './Home.css';
import { add, bookmarkOutline, calendar, time } from 'ionicons/icons';
import axios from 'axios';

const Todo: React.FC = () => {

    const [data, setData] = useState<any[]>([]);
    const [input, setInput] = useState('');
    const [bookmark, setBookmark] = useState('primary');
    const [kategori, setKategori] = useState('');
    const [detail, setDetail] = useState<any>({});
    const [showModal, setShowModal] = useState(false);
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        getAPI();
        console.log(data);
    }, []);

    const getAPI = () => {
        axios.get('http://localhost:8080/products')
            .then(response => {
                if (response.status === 200) {
                    let newData = response.data.data ? response.data.data : [];
                    setData(newData);
                }
            })
    }

    const postAPI = () => {

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        const date = mm + '/' + dd + '/' + yyyy;

        let params = new URLSearchParams();
        params.append('namaList', input);
        params.append('kategori', kategori);
        params.append('icon', bookmark);
        params.append('selectedDate', date);
        params.append('selectedTime', '07:00');
        params.append('checked', '0');

        axios.post('http://localhost:8080/products', params)
            .then(res => {
                console.log(res.data.messages);
                setInput('');
                setBookmark('primary');
                getAPI();
            })
            .catch(err => {
                console.log("error in request: ", err);
            });
    }

    const deleteAPI = (id: any) => {

        axios.delete("http://localhost:8080/products/" + id)
            .then(res => {
                console.log(res.data.messages);
                getAPI();
            })
            .catch(err => {
                console.log("error in request", err);
            });
    }

    const putAPI = (id: any) => {

        let params = new URLSearchParams();
        params.append('namaList', detail.namaList);
        params.append('kategori', detail.kategori);
        params.append('icon', detail.icon);
        params.append('selectedDate', detail.selectedDate);
        params.append('selectedTime', detail.selectedTime);
        params.append('checked', detail.checked);

        axios.put('http://localhost:8080/products/' + id, params)
            .then(res => {
                console.log(res.data.messages);
                getAPI();
            })
            .catch(err => {
                console.log("error in request", err);
            });
    }

    function isTrue(value: any) {
        if (typeof (value) === 'string') {
            value = value.trim().toLowerCase();
        }
        switch (value) {
            case true:
            case "true":
            case 1:
            case "1":
            case "on":
            case "yes":
                return true;
            default:
                return false;
        }
    }

    const handleDetail = (object: any) => {
        setDetail(object);
    }

    const handleEdit = (e: any) => {
        setDetail({
            ...detail,
            [e.target.name]: e.target.value
        })
        // console.log(detail);
    }

    const handleEditLabel = (value: string) => {
        setDetail({
            ...detail,
            icon: value
        })
        // console.log(detail);
    }

    const handleCheck = (obj: any, value: any) => {
        // let indexArray = data.findIndex((obj => obj.id === id))

        let params = new URLSearchParams();
        params.append('namaList', obj.namaList);
        params.append('kategori', obj.kategori);
        params.append('icon', obj.icon);
        params.append('selectedDate', obj.selectedDate);
        params.append('selectedTime', obj.selectedTime);
        params.append('checked', value ? '1' : '0');

        axios.put('http://localhost:8080/products/' + obj.id, params)
            .then(res => {
                console.log(res.data.messages, res.data.data.checked);
                getAPI();
            })
            .catch(err => {
                console.log("error in request", err);
            });
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="ion-padding">
                    {/* <IonTitle>Todo list</IonTitle> */}
                    <IonChip onClick={() => setFilter("")}>
                        <IonLabel >
                            Semua
                        </IonLabel>
                    </IonChip>
                    <IonChip onClick={() => setFilter("pribadi")}>
                        <IonLabel>
                            Pribadi
                        </IonLabel>
                    </IonChip>
                    <IonChip onClick={() => setFilter("kerja")}>
                        <IonLabel>
                            Kerja
                        </IonLabel>
                    </IonChip>
                    <IonChip onClick={() => setFilter("wishlist")}>
                        <IonLabel>
                            Wishlist
                        </IonLabel>
                    </IonChip>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">

                <IonList style={{ backgound: "transparent" }}>
                    {filter ? (
                        data.filter(newData => newData.kategori === filter).map(newArr => (
                            <IonItemSliding style={{ marginBottom: "2vh" }} key={newArr.id}>
                                <IonItem style={{ minHeight: "inherit", border: "1px solid #d7d8da", borderRadius: "7.5px" }} lines="none" >

                                    <IonIcon color={newArr.icon} icon={bookmarkOutline} onClick={() => { handleDetail(newArr); setShowModalDetail(true) }} />

                                    <IonLabel onClick={() => { handleDetail(newArr); setShowModalDetail(true) }}>

                                        <h2 style={{ marginLeft: "5vh", textDecoration: isTrue(newArr.checked) ? "line-through" : "none" }}>{newArr.namaList}</h2>

                                        <p style={{ fontSize: "0.5em", marginLeft: "5vh" }}>
                                            {new Date(newArr.selectedDate).toLocaleDateString('ID')}
                                        </p>
                                    </IonLabel>

                                    <IonButton fill="clear" size="large" color="transparent">
                                        <IonCheckbox checked={isTrue(newArr.checked)} slot="end" color="medium" onIonChange={(e) => handleCheck(newArr, e.detail.checked)} />
                                    </IonButton>

                                </IonItem>

                                <IonItemOptions side="end">
                                    <IonItemOption expandable onClick={() => deleteAPI(newArr.id)}>
                                        Delete
                                    </IonItemOption>
                                </IonItemOptions>

                            </IonItemSliding>
                        ))

                    ) : (

                        data.map(newArr => (
                            <IonItemSliding style={{ marginBottom: "2vh" }} key={newArr.id}>
                                <IonItem style={{ minHeight: "inherit", border: "1px solid #d7d8da", borderRadius: "7.5px" }} lines="none" >

                                    <IonIcon color={newArr.icon} icon={bookmarkOutline} onClick={() => { handleDetail(newArr); setShowModalDetail(true) }} />

                                    <IonLabel onClick={() => { handleDetail(newArr); setShowModalDetail(true) }}>

                                        <h2 style={{ marginLeft: "5vh", textDecoration: isTrue(newArr.checked) ? "line-through" : "none" }}>{newArr.namaList}</h2>

                                        <p style={{ fontSize: "0.5em", marginLeft: "5vh" }}>
                                            {new Date(newArr.selectedDate).toLocaleDateString('ID')}
                                        </p>
                                    </IonLabel>

                                    <IonButton fill="clear" size="large" color="transparent">
                                        <IonCheckbox checked={isTrue(newArr.checked)} slot="end" color="medium" onIonChange={(e) => handleCheck(newArr, e.detail.checked)} />
                                    </IonButton>

                                </IonItem>

                                <IonItemOptions side="end">
                                    <IonItemOption expandable onClick={() => deleteAPI(newArr.id)}>
                                        Delete
                                    </IonItemOption>
                                </IonItemOptions>

                            </IonItemSliding>
                        ))
                    )}
                </IonList>

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => setShowModal(true)}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>

                {/* Modal Tambah */}
                <IonModal isOpen={showModal} cssClass='my-custom-class'>
                    <IonHeader translucent>
                        <IonToolbar>
                            <IonTitle>Tambah</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setShowModal(false)}>Cancel</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding" fullscreen>

                        <IonInput style={{ height: "10vh", paddingLeft: "2vw", border: "0.25px solid gray", marginBottom: "5%", borderRadius: "7.5px" }} value={input} onIonChange={(e: any) => setInput(e.target.value)} placeholder="Masukan tugas baru" />

                        <IonText>
                            Kategori
                        </IonText>

                        <IonItem color="primary" style={{ borderRadius: "10px", margin: "5% 0" }}>
                            <IonSelect value={kategori} interface="popover" onIonChange={e => setKategori(e.detail.value)}>
                                <IonSelectOption value="" disabled>Tidak ada kategori</IonSelectOption>
                                <IonSelectOption value="pribadi">Pribadi</IonSelectOption>
                                <IonSelectOption value="kerja">Kerja</IonSelectOption>
                                <IonSelectOption value="wishlist">Wishlist</IonSelectOption>
                            </IonSelect>
                        </IonItem>

                        <IonGrid>
                            <IonLabel>
                                Label
                            </IonLabel>
                            <IonRow className="ion-align-items-stretch">
                                <IonCol>
                                    <IonButton onClick={() => setBookmark("primary")} expand="block" color="transparent">
                                        <IonIcon color="primary" icon={bookmarkOutline} />
                                    </IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton onClick={() => setBookmark("success")} expand="block" color="transparent">
                                        <IonIcon color="success" icon={bookmarkOutline} />
                                    </IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton onClick={() => setBookmark("warning")} expand="block" color="transparent">
                                        <IonIcon color="warning" icon={bookmarkOutline} />
                                    </IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton onClick={() => setBookmark("danger")} expand="block" color="transparent">
                                        <IonIcon color="danger" icon={bookmarkOutline} />
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonButton onClick={() => { postAPI(); setShowModal(false) }} expand="block">Tambah</IonButton>
                    </IonContent>
                </IonModal>

                {/* Modal Detail Edit */}
                <IonModal isOpen={showModalDetail} cssClass='my-custom-class'>
                    <IonHeader translucent>
                        <IonToolbar>
                            <IonTitle>Edit</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setShowModalDetail(false)}>Cancel</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding" fullscreen>

                        <IonInput style={{ height: "10vh", paddingLeft: "2vw", border: "0.25px solid gray", marginBottom: "5%", borderRadius: "7.5px" }} name="namaList" value={detail.namaList} onIonChange={(e) => handleEdit(e)} placeholder="Masukan tugas baru" />

                        <IonText>
                            Kategori
                        </IonText>

                        <IonItem color="primary" style={{ borderRadius: "10px", margin: "5% 0" }}>
                            <IonSelect name="kategori" value={detail.kategori} interface="popover" onIonChange={e => handleEdit(e)}>
                                <IonSelectOption value="" disabled>Tidak ada kategori</IonSelectOption>
                                <IonSelectOption value="pribadi">Pribadi</IonSelectOption>
                                <IonSelectOption value="kerja">Kerja</IonSelectOption>
                                <IonSelectOption value="wishlist">Wishlist</IonSelectOption>
                            </IonSelect>
                        </IonItem>

                        <IonText>
                            Tanggal dan waktu
                        </IonText>

                        <IonItem color="primary" style={{ borderRadius: "10px", margin: "5% 0" }}>
                            <IonLabel>
                                <IonIcon icon={calendar} />
                            </IonLabel>
                            <IonDatetime
                                name="selectedDate"
                                displayFormat="YYYY-MMM-DD"
                                value={detail.selectedDate} onIonChange={e => handleEdit(e)}
                            ></IonDatetime>
                        </IonItem>

                        <IonItem color="primary" style={{ borderRadius: "10px", margin: "5% 0" }}>
                            <IonLabel>
                                <IonIcon icon={time} />
                            </IonLabel>
                            <IonDatetime
                                name="selectedTime"
                                displayFormat="h:mm A"
                                value={detail.selectedTime} onIonChange={e => handleEdit(e)}
                            ></IonDatetime>
                        </IonItem>

                        <IonGrid>
                            <IonLabel>
                                Label
                            </IonLabel>
                            <IonRow className="ion-align-items-stretch">
                                <IonCol>
                                    <IonButton onClick={() => handleEditLabel("primary")} expand="block" color="transparent">
                                        <IonIcon color="primary" icon={bookmarkOutline} />
                                    </IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton onClick={() => handleEditLabel("success")} expand="block" color="transparent">
                                        <IonIcon color="success" icon={bookmarkOutline} />
                                    </IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton onClick={() => handleEditLabel("warning")} expand="block" color="transparent">
                                        <IonIcon color="warning" icon={bookmarkOutline} />
                                    </IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton onClick={() => handleEditLabel("danger")} expand="block" color="transparent">
                                        <IonIcon color="danger" icon={bookmarkOutline} />
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonButton onClick={() => { putAPI(detail.id); setShowModalDetail(false) }} expand="block">Simpan</IonButton>
                    </IonContent>
                </IonModal>

            </IonContent>
        </IonPage >
    );
};

export default Todo;
