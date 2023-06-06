import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemMenu,
  listMenuSelector,
  swapItemMenu,
  uploadMenu,
  uploadMenuLaunch,
} from "../../../../slices/menu";
import { LoaderPage } from "../../../../components/LoaderPage/LoaderPage";
import styles from "../MenuAdmin.module.scss";
import { AddCard } from "../../../components/AddCard/AddCard";
import { ReactSortable } from "react-sortablejs";
import LazyLoadImage from "../../../../components/LazyLoadImage/LazyLoadImage";
import ImageViewer from "react-simple-image-viewer";
import { Module } from "../../../components/Module/Module";
import { DragModal } from "../../components/DragModal/DragModal";
import { nanoid } from "@reduxjs/toolkit";
import { DeleteModalMenu } from "./DeleteModal/DeleteModalMenu";

const initialModalState = {
  src: null,
  id: nanoid(5),
};
export const ChildrenAdminMenu = ({ getMenu, launch }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [modalState, setModalState] = useState(initialModalState);
  const items = useSelector(listMenuSelector);
  const { loading } = useSelector((state) => state.menu);
  const [isOpenModal, setOpenModal] = useState(false);
  const [change, setChange] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenu());
  }, []);

  const handleClickOpenNews = useCallback((menuData) => {
    setOpenModal(true);
    setModalState(menuData);
  }, []);

  const handleClickCloseModal = useCallback(() => {
    setOpenModal(false);
    setChange(false);
    setModalState(initialModalState);
  }, []);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  const sortableOptions = {
    animation: 250,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: "ghost",
    group: "images",
    forceFallback: true,
  };

  const listChangeHandler = useCallback(() => {
    setOpenModal(true);
    setChange(true);
  }, []);

  const upload = useCallback(
    (file) => {
      if (launch) {
        dispatch(uploadMenuLaunch(file));
      } else {
        dispatch(uploadMenu(file));
      }
    },
    [dispatch]
  );
  const reorder = ({ oldIndex, newIndex }) => {
    const result = Array.from(items);
    result[oldIndex] = { ...result[oldIndex], position: newIndex };
    result[newIndex] = { ...result[newIndex], position: oldIndex };
    setData(result);
  };

  const acceptList = useCallback(
    (newState) => {
      dispatch(swapItemMenu({ obj: newState, launch }));
    },
    [dispatch]
  );
  if (loading) {
    return <LoaderPage />;
  }
  return (
    <>
      <div className={styles.addContainer}>
        <AddCard launch={launch} upload={upload} />
      </div>
      <ReactSortable
        onEnd={reorder}
        className={styles.cardContainer}
        list={items.map((element) => ({ ...element }))}
        setList={(currentList, sortable, store) => {
          if (
            store.dragging &&
            store.dragging.props &&
            JSON.stringify(store.dragging.props.list) !==
              JSON.stringify(currentList)
          ) {
            listChangeHandler(currentList);
          }
        }}
        {...sortableOptions}
      >
        {items.map((element, index) => (
          <div key={element.id} className={styles.closeContainer}>
            <LazyLoadImage
              custom={styles.custom}
              imgStyle={styles.custom}
              src={element.file}
              onClick={() => openImageViewer(index)}
              alt=""
            />
            <button
              onClick={() => {
                handleClickOpenNews(element);
              }}
              className={styles.close}
            >
              x
            </button>
          </div>
        ))}
      </ReactSortable>
      {isViewerOpen && (
        <ImageViewer
          src={items.map((e) => e.file)}
          currentIndex={currentImage}
          disableScroll={true}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
      {change && (
        <Module
          active={isOpenModal}
          setActive={setOpenModal}
          onClose={handleClickCloseModal}
        >
          <DragModal
            title={"Вы уверены что хотите поменять местами данные карточки?"}
            setOpenModal={setOpenModal}
            setChange={setChange}
            data={data}
            acceptList={acceptList}
          />
        </Module>
      )}
      {!change && (
        <Module
          active={isOpenModal}
          setActive={setOpenModal}
          onClose={handleClickCloseModal}
        >
          <DeleteModalMenu
            delete={deleteItemMenu}
            id={modalState.id}
            launch={launch}
            onClose={handleClickCloseModal}
          />
        </Module>
      )}
    </>
  );
};
